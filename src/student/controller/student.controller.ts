import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { CreateStudent } from '../dtos/create-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('student')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin', 'teacher')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post('create')
    async createStudent(@Body() createStudent: CreateStudent) {
        return this.studentService.createStudent(createStudent)
    }

    @Get('read/:id')
    async getStudentDetails(@Param('id') id: number) {
        return this.studentService.getStudentDetails(id)
    }
}
