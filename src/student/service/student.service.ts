import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { School } from 'src/school/entities/school.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { CreateStudent } from '../dtos/create-student.dto';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';
import { StudentDetails } from '../dtos/student-details.dto';

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

    async getStudentDetails(studentId:number): Promise<StudentDetails | undefined> {
        const student = await this.studentRepository.findOne({ where: { id: studentId } })
        if (!student) throw new EntityNotFoundException('Student', 'id')
        return this.studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.classroom', 'classroom')
            .leftJoinAndSelect('student.school', 'school')
            .where('student.id = :studentId', { studentId })
            .select([
                'student.firstName AS firstname',
                'student.lastName AS lastname',
                'student.phone AS phone',
                'student.email AS email',
                'student.fatherName AS fatherName',
                'student.motherName AS motherName',
                'student.fatherPhone AS fatherPhone',
                'student.motherPhone AS motherPhone',
                'classroom.name AS className',
                'school.name AS schoolName'
            ])
            .getRawOne()
    }
}
