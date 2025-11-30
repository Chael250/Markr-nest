import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTeacher } from '../dto/create-teacher.dto';
import { Teacher } from '../entities/teacher.entity';
import { TeacherService } from '../service/teacher.service';
import { TeacherDetails } from '../dto/teacher-details.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('teacher')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Post('create')
    @Roles("teacher")
    create(@Body() teacher: CreateTeacher): Promise<Teacher> {
        return this.teacherService.createTeacher(teacher);
    }

    @Get('read/:id')
    @Roles("admin")
    read(@Param('id') id: number): Promise<TeacherDetails | undefined> {
        return this.teacherService.readTeacher(id);
    }

    @Delete('delete/:id')
    @Roles("admin")
    delete(@Param('id') id: number): Promise<Teacher> {
        return this.teacherService.deleteTeacher(id);
    }
}