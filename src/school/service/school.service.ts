import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from '../entities/school.entity';
import { Repository } from 'typeorm';
import { HeadMaster } from 'src/head-master/entities/head-master.entity';
import { CreateSchool } from '../dtos/create-school.dto';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';

@Injectable()
export class SchoolService {
    constructor(@InjectRepository(School) private readonly schoolRepository:Repository<School>,
    @InjectRepository(HeadMaster) private readonly headMasterRepository:Repository<HeadMaster>) {}

    async createSchool(createSchool:CreateSchool) {
        const { name, headMasterId } = createSchool
        const newSchool = this.schoolRepository.create({ name })
        const headMaster = await this.headMasterRepository.findOne({ where:{ id: headMasterId } })
        if (!headMaster) throw new EntityNotFoundException('headMaster', 'id')
        newSchool.headMaster = headMaster
        return this.schoolRepository.save(newSchool)
    }
}
