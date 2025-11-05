import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grading } from '../entities/grading.entity';
import { Repository } from 'typeorm';
import { MarksDto } from '../dtos/marks.dto';

@Injectable()
export class GradingService {
    constructor(@InjectRepository(Grading) private readonly gradingRepository:Repository<Grading>) {}

    async getStudentsAndMarks(classId:number): Promise<MarksDto[]> {
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
}
