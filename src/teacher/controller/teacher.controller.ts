import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTeacher } from '../dto/create-teacher.dto';
import { Teacher } from '../entities/teacher.entity';
import { TeacherService } from '../service/teacher.service';
import { TeacherDetails } from '../dto/teacher-details.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Post('create')
    create(@Body() teacher: CreateTeacher): Promise<Teacher> {
        return this.teacherService.createTeacher(teacher);
    }

    @Get('read/:id')
    read(@Param('id') id: number): Promise<TeacherDetails | undefined> {
        return this.teacherService.readTeacher(id);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<Teacher> {
        return this.teacherService.deleteTeacher(id);
    }
}