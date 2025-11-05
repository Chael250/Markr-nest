import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './entities/classroom.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Student } from 'src/student/entities/student.entity';
import { ClassroomService } from './service/classroom.service';
import { ClassroomController } from './controller/classroom.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Classroom, Teacher, Student])],
    providers: [ClassroomService],
    controllers: [ClassroomController]
})
export class ClassroomModule {}
