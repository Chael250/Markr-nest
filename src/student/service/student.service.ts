import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { School } from 'src/school/entities/school.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { CreateStudent } from '../dtos/create-student.dto';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private readonly studentRepository:Repository<Student>,
    @InjectRepository(School) private readonly schoolRepository:Repository<School>,
    @InjectRepository(Classroom) private readonly classroomRepository:Repository<Classroom>) {}

    async createStudent(createStudent: CreateStudent) {
        const { schoolId, classroomId } = createStudent

        const school = await this.schoolRepository.findOne({ where: { id: schoolId } })
        const classroom = await this.classroomRepository.findOne({ where: { id: classroomId } })

        if (!school) throw new EntityNotFoundException('School', 'id')
        if (!classroom) throw new EntityNotFoundException('Classroom', 'id')
        const newStudent = this.studentRepository.create({ ...createStudent, school: { id: schoolId }, classroom: { id: classroomId } })
        return this.studentRepository.save(newStudent)
    }
}
