import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GradingService } from '../service/grading.service';
import { MarksDto } from '../dtos/marks.dto';
import { CreateMarks } from '../dtos/create-marks.dto';

@Controller('grading')
export class GradingController {
    constructor(private readonly gradingService: GradingService) {}

    @Get('marks/:classId')
    async getAllMarksByClass(@Param('classId') classId: number): Promise<MarksDto[]> {
        return this.gradingService.getStudentsAndMarks(classId)
    } 

    @Post('create')
    async createMarks(@Body() createMarks: CreateMarks) {
        return this.gradingService.createMarks(createMarks)
    }
}