import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from '../entities/classroom.entity';
import { Repository } from 'typeorm';
import { CreateClass } from '../dtos/CreateClass.dto';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';

@Injectable()
export class ClassroomService {
    constructor(
        @InjectRepository(Classroom) private readonly classroomRepository:Repository<Classroom>,
        @InjectRepository(Teacher) private readonly teacherRepository: Repository<Teacher>
    ) {}
     
    async createClassroom(createClass:CreateClass) {
        const teacher = await this.teacherRepository.findOne({ where: { user: { lastName: createClass.headTeacherName } } })
        if (!teacher) throw new EntityNotFoundException('Teacher', 'name')

        const newClass = this.classroomRepository.create({
            name: createClass.name,
            totalStudents: createClass.totalStudents,
            headTeacher: teacher
        })

        return this.classroomRepository.save(newClass)
    }
}
