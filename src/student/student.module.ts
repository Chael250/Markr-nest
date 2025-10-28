import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { School } from 'src/school/entities/school.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Student, School, Classroom
    ])]
})
export class StudentModule {}
