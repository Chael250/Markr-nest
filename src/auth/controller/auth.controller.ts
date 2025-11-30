import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import express from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    async login(@Body() body: { username: string, password: string, remember: boolean }, @Req() req, @Res({ passthrough: true }) res: express.Response) {
        const meta = { ip: req.ip, device: req.headers['user-agent'] || 'Unknown'}
        const { access, rawRefresh, refreshRowId, expiresAt } = await this.authService.login(body.username, body.password, body.remember, meta)

        res.cookie('refreshToken', rawRefresh, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax', //strict
            maxAge: body.remember ? 30*24*3600*1000 : 7*24*3600*1000,
            path: '/auth'
        })

        return { access, expiresIn: 15*60 } // client stores access in memory
    }

    @Post('refresh')
    async refresh(@Req() req, @Res({ passthrough: true }) res: express.Response) {
        const cookie = req.cookies?.refreshToken;
        if(!cookie) throw new UnauthorizedException();

        const { token:raw, id } = JSON.parse(cookie)
        const meta = { ip: req.ip, device: req.headers['user-agent'] || 'unknown' }
        const { access, rawRefresh, refreshRowId } = await this.authService.rotateRefresh(raw, id, meta)

        res.cookie('refreshToken', rawRefresh, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax', //strict
            maxAge: 30*24*3600*1000,
            path: '/auth'
        })

        return { access }
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@Req() req, @Res({ passthrough: true }) res: express.Response) {
    const cookie = req.cookies?.refreshToken;
    if (cookie) {
      const { id } = JSON.parse(cookie);
      await this.authService.revokeAllForUser(id); // mark revoked
    }
    res.clearCookie('refreshToken', { path: '/auth' });
    return { ok: true };
  }
}
