import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { School } from 'src/school/entities/school.entity';
import { Classroom } from 'src/classroom/entities/classroom.entity';
import { StudentService } from './service/student.service';
import { StudentController } from './controller/student.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        Student, School, Classroom
    ])],
    providers: [StudentService],
    controllers: [StudentController]
})
export class StudentModule {}
