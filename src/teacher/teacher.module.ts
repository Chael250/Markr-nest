import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { School } from 'src/school/entities/school.entity';
import { Subject } from 'typeorm/persistence/Subject.js';

@Module({
    imports: [TypeOrmModule.forFeature([
        Teacher, School, Subject
    ])]
})
export class TeacherModule {}
