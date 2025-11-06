import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { CreateStudent } from '../dtos/create-student.dto';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post('create')
    async createStudent(@Body() createStudent: CreateStudent) {
        return this.studentService.createStudent(createStudent)
    }
}
