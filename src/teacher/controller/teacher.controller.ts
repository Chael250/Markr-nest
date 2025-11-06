import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeacher } from '../dto/create-teacher.dto';
import { Teacher } from '../entities/teacher.entity';
import { TeacherService } from '../service/teacher.service';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}
    
    @Post('create')
    create(@Body() teacher: CreateTeacher): Promise<Teacher> {
        return this.teacherService.createTeacher(teacher);
    }
}