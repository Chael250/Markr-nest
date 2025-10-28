import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Subject } from 'typeorm/persistence/Subject.js';
import { Grading } from './entities/grading.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Grading, Subject, Student
    ])]
})
export class GradingModule {}
