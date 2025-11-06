import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grading } from '../entities/grading.entity';
import { Repository } from 'typeorm';
import { MarksDto } from '../dtos/marks.dto';
import { CreateMarks } from '../dtos/create-marks.dto';
import { Subject } from 'src/subject/entities/subject.entity';
import { Student } from 'src/student/entities/student.entity';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';
import { MarksTeacher } from '../dtos/marks-teacher.dto';

@Injectable()
export class GradingService {
    constructor(@InjectRepository(Grading) private readonly gradingRepository:Repository<Grading>,
    @InjectRepository(Subject) private readonly subjectRepository:Repository<Subject>,
    @InjectRepository(Student) private readonly studentRepository:Repository<Student>) {}

    async getStudentsAndMarks(classId:number): Promise<MarksDto[]> {
        const classroom = await this.studentRepository.findOne({ where: { id: classId } })
        if (!classroom) throw new EntityNotFoundException('Classroom', 'id')

        return await this.gradingRepository
            .createQueryBuilder('grading')
            .leftJoinAndSelect('grading.student', 'students')
            .leftJoinAndSelect('grading.subject', 'subject')
            .leftJoinAndSelect('students.classroom', 'classroom')
            .where('classroom.id = :classId', { classId })
            .select([
                'grading.marks AS marks',
                'students.firstName AS firstname',
                'students.lastName AS lastname',
                'students.email AS email',
                'subject.name AS subjectName',
                'subject.marks AS totalMarks'
            ])
            .getRawMany()
    }

    async createMarks(createMarks: CreateMarks) {
        const { marks, subjectId, studentId } = createMarks
        const subject = await this.subjectRepository.findOne({ where: { id: subjectId } })
        const student = await this.studentRepository.findOne({ where: { id: studentId } })
        if (!subject) throw new EntityNotFoundException('Subject', 'id')
        if (!student) throw new EntityNotFoundException('Student', 'id')
        const newMark = this.gradingRepository.create({ marks, subject: { id: subjectId }, student: { id: studentId } })
        return this.gradingRepository.save(newMark)
    }

    async getMarksByTeacher(classId:number, teacherId:number): Promise<MarksTeacher[]> {
        return await this.gradingRepository
            .createQueryBuilder('grading')
            .leftJoinAndSelect('grading.subject', 'subject')
            .leftJoinAndSelect('grading.student', 'student')
            .leftJoinAndSelect('student.classroom', 'classroom')
            .leftJoinAndSelect('subject.teacher', 'teacher')
            .where('teacher.id = :teacherId', { teacherId })
            .where('classroom.id = :classId', { classId })
            .select([
                'grading.marks AS marks',
                'student.firstName AS firstname',
                'student.lastName AS lastname',
                'student.email AS email',
                'subject.name AS subjectName',
                'subject.marks AS totalMarks'
            ])
            .getRawMany()
    }
}
