import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClassroomService } from '../service/classroom.service';
import { CreateClass } from '../dtos/CreateClass.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('classroom')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ClassroomController {
    constructor(private readonly classroomService:ClassroomService) {}

    @Post('create')
    @Roles('master')
    async createClassroom(@Body() createClass:CreateClass) {
        return this.classroomService.createClassroom(createClass)
    }
}
