import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from '../entities/school.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolService {
    constructor(@InjectRepository(School) private readonly schoolRepository:Repository<School>) {}

    async createSchool(createSchool:CreateSchool) {

    }
}
