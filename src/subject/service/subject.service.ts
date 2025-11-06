import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateSubject } from '../dto/create-subject.dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';

@Injectable()
export class SubjectService {
    constructor(@InjectRepository(Subject) private readonly subjectRepository:Repository<Subject>,
    @InjectRepository(Teacher) private readonly teacherRepository:Repository<Teacher>) {}

    async createSubject(createSubject: CreateSubject) {
        const { name, marks, hours, teacherId } = createSubject
        const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } })
        if (!teacher) throw new EntityNotFoundException('Teacher', 'id')
        const newSubject = this.subjectRepository.create({ name, marks, hours, teacher: { id: teacherId } })
        return this.subjectRepository.save(newSubject)
    }
}
