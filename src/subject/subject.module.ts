import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './service/subject.service';
import { SubjectController } from './controller/subject.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        Subject, Teacher
    ])],
    providers: [SubjectService],
    controllers: [SubjectController],
    exports: [SubjectService]
})
export class SubjectModule {}
