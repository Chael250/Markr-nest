import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeadMaster } from '../entities/head-master.entity';
import { CreateMaster } from '../dtos/create-master.dto';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class HeadMasterService {
    constructor(@InjectRepository(HeadMaster) private readonly headMasterRepository: Repository<HeadMaster>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async findAll(): Promise<HeadMaster[]> {
        return this.headMasterRepository.find();
    }

    async findOne(id: number): Promise<HeadMaster> {
        const headMaster = await this.headMasterRepository.findOne({ where:{ id }});
        if (!headMaster) throw new NotFoundException('HeadMaster not found');
        return headMaster; 
    }

    async create(headMaster: CreateMaster): Promise<HeadMaster> {
        const user = await this.userRepository.findOne({ where:{ id: headMaster.userId }})
        if (!user) throw new EntityNotFoundException('user', 'name');
        const newMaster = this.headMasterRepository.create({ user });
        return this.headMasterRepository.save(newMaster);
    }

    async update(id: number, headMaster: HeadMaster): Promise<HeadMaster> {
        const existing = await this.findOne(id);
        if (!existing) throw new NotFoundException('HeadMaster not found');
        return this.headMasterRepository.save({ ...existing, ...headMaster });
    }

    async delete(id: number): Promise<void> {
        await this.headMasterRepository.delete(id);
    }
}
