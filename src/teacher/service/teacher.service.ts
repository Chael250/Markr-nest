import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
    constructor(@InjectRepository(Teacher) private readonly teacherRepository:Repository<Teacher>) {}

    async createTeacher() {}
}
