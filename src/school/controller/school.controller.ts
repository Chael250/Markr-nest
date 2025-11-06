import { Body, Controller, Post } from '@nestjs/common';
import { SchoolService } from '../service/school.service';
import { CreateSchool } from '../dtos/create-school.dto';

@Controller('school')
export class SchoolController {
    constructor(private readonly schoolService:SchoolService) {}

    @Post('create')
    createSchool(@Body() createSchool:CreateSchool) {
        return this.schoolService.createSchool(createSchool)
    }
}
