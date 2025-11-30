import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from '../dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findById(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }

    async create(userData: CreateUser) {
        // check duplicate email
        const existing = await this.findByEmail(userData.email);
        if (existing) {
            throw new ConflictException('Email already in use');
        }

        // hash the password (cybersecurity 101 🛡️)
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // create new user with hashed password
        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }
}

