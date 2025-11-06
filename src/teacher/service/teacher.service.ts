import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacher } from '../dto/create-teacher.dto';
import { School } from 'src/school/entities/school.entity';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';

@Injectable()
export class TeacherService {
    constructor(@InjectRepository(Teacher) private readonly teacherRepository:Repository<Teacher>,
    @InjectRepository(School) private readonly schoolRepository:Repository<School>) {}

    async createTeacher(createTeacher: CreateTeacher) {
        const { schoolId, userId } = createTeacher
        const school = await this.schoolRepository.findOne({ where: { id: schoolId } })
        if (!school) throw new EntityNotFoundException('School', 'id')
        const newTeacher = this.teacherRepository.create({ school: { id: schoolId }, user: { id: userId } })
        return this.teacherRepository.save(newTeacher)
    }
}
