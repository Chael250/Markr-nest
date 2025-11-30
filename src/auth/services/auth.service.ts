import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

const longTime = process.env.REMEMBER_LONG_TIME ? parseInt(process.env.REMEMBER_LONG_TIME) : 30 * 24 * 60 * 60 * 1000;
const shortTime = process.env.REMEMBER_SHORT_TIME ? parseInt(process.env.REMEMBER_SHORT_TIME) : 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>,

        private jwtService: JwtService
    ) {}

    async login(username: string, password: string, remember:boolean, meta: {ip: string, device: string}) {
        const user = await this.userRepository.findOneBy({email: username}) 
        if(!user || !(await bcrypt.compare(password, user.password))) throw new UnauthorizedException();

        const access = await this.signAccessToken(user);
        const { rawRefresh, refreshRow } = await this.createRefreshToken(user, remember, meta);

        return { access, rawRefresh, refreshRowId: refreshRow.id, expiresAt: refreshRow.expiresAt };
    }

    signAccessToken(user: User) {
        const payload = { 
            sub: user.id, 
            email: user.email, 
            role: user.role 
        };
        return this.jwtService.signAsync(payload);
    }

    async createRefreshToken(user:User, remember:boolean, meta: {ip: string, device: string}) {
        const refreshPayload = { 
            sub: user.id, 
            remember 
        };
    
        const refreshToken = await this.jwtService.signAsync(refreshPayload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',
        } as any);

        const hash = await bcrypt.hash(refreshToken, 10)
        const expiresAt = new Date(Date.now() + (remember ? longTime : shortTime));
        
        const row = this.refreshTokenRepository.create({
            user, tokenHash: hash, expiresAt, ip: meta.ip, device: meta.device
        })
        await this.refreshTokenRepository.save(row)

        return { rawRefresh: refreshToken, refreshRow:row }
    }

    async rotateRefresh(oldRaw: string, oldRowId: number, meta) {
        const oldRow = await this.refreshTokenRepository.findOneBy({id: oldRowId})
        if(!oldRow) throw new UnauthorizedException();

        const matches = await bcrypt.compare(oldRaw, oldRow.tokenHash)
        if(!matches) {
            if(oldRow.isRevoked) {
                await this.revokeAllForUser(oldRow.user.id);
                throw new ForbiddenException('Token reuse detected')
            }
            throw new UnauthorizedException()
        }

        if(oldRow.expiresAt < new Date() || oldRow.isRevoked) throw new UnauthorizedException();

        const { rawRefresh, refreshRow } = await this.createRefreshToken(oldRow.user, (oldRow.expiresAt.getTime()-Date.now()) > shortTime, meta)

        oldRow.isRevoked = true
        oldRow.replacedByTokenId = refreshRow.id
        await this.refreshTokenRepository.save(oldRow)

        const access = this.signAccessToken(oldRow.user)
        return { access, rawRefresh, refreshRowId: refreshRow.id }
    }

    async revokeAllForUser(userId: number) {
        await this.refreshTokenRepository.update({ user: {id: userId}}, {isRevoked: true})
    }
}