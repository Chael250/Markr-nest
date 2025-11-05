import { Controller, Get, Param } from '@nestjs/common';
import { GradingService } from '../service/grading.service';
import { MarksDto } from '../dtos/marks.dto';

@Controller('grading')
export class GradingController {
    constructor(private readonly gradingService: GradingService) {}

    @Get('marks/:classId')
    async getAllMarksByClass(@Param('classId') classId: number): Promise<MarksDto[]> {
        return this.gradingService.getStudentsAndMarks(classId)
    } 
}