import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GradingService } from '../service/grading.service';
import { MarksDto } from '../dtos/marks.dto';
import { CreateMarks } from '../dtos/create-marks.dto';
import { MarksTeacher } from '../dtos/marks-teacher.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('grading')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GradingController {
    constructor(private readonly gradingService: GradingService) {}

    @Get('marks/:classId')
    @Roles('master', 'teacher')
    async getAllMarksByClass(@Param('classId') classId: number): Promise<MarksDto[]> {
        return this.gradingService.getStudentsAndMarks(classId)
    } 

    @Get('marks/:classId/:teacherId')
    @Roles('master', 'teacher')
    async getAllMarksByTeacher(@Param('classId') classId: number, @Param('teacherId') teacherId: number): Promise<MarksTeacher[]> {
        return this.gradingService.getMarksByTeacher(classId, teacherId)
    }

    @Post('create')
    @Roles('master', 'teacher')
    async createMarks(@Body() createMarks: CreateMarks) {
        return this.gradingService.createMarks(createMarks)
    }
}