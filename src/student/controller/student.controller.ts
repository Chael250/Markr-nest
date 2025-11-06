import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { CreateStudent } from '../dtos/create-student.dto';

@Controller('student')
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
