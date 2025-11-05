import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUser } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where:{ email }})
    } 

    async findById(id: number) {
        return this.userRepository.findOne({ where:{ id }})
    }

    async create(userData: CreateUser) {
        const existing = await this.findByEmail(userData.email);
        if (existing) throw new ConflictException('Email already in use'); //Checks for emails already in use
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
}
