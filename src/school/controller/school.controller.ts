import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SchoolService } from '../service/school.service';
import { CreateSchool } from '../dtos/create-school.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('school')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('master')
export class SchoolController {
    constructor(private readonly schoolService:SchoolService) {}

    @Post('create')
    createSchool(@Body() createSchool:CreateSchool) {
        return this.schoolService.createSchool(createSchool)
    }
}
