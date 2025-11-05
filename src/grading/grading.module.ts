import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Subject } from 'typeorm/persistence/Subject.js';
import { Grading } from './entities/grading.entity';
import { GradingService } from './service/grading.service';
import { GradingController } from './controller/grading.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        Grading, Subject, Student
    ])],
    providers: [GradingService],
    controllers: [GradingController]
})
export class GradingModule {}
