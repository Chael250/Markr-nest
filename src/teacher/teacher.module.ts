import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { School } from 'src/school/entities/school.entity';
import { Subject } from 'typeorm/persistence/Subject.js';
import { TeacherController } from './controller/teacher.controller';
import { TeacherService } from './service/teacher.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Teacher, School, Subject
    ])],
    controllers: [TeacherController],
    providers: [TeacherService],
})
export class TeacherModule {}
