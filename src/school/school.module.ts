import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Student } from 'src/student/entities/student.entity';
import { HeadMaster } from 'src/head-master/entities/head-master.entity';
import { SchoolService } from './service/school.service';
import { SchoolController } from './controller/school.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        School, HeadMaster, Student
    ])],
    providers: [SchoolService],
    controllers: [SchoolController]
})
export class SchoolModule {}
