import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Subject } from './entities/subject.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Subject, Teacher
    ])]
})
export class SubjectModule {}
