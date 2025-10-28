import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Student } from 'src/student/entities/student.entity';
import { HeadMaster } from 'src/head-master/entities/head-master.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        School, HeadMaster, Student
    ])]
})
export class SchoolModule {}
