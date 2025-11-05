import { Body, Controller, Post } from '@nestjs/common';
import { ClassroomService } from '../service/classroom.service';
import { CreateClass } from '../dtos/CreateClass.dto';

@Controller('classroom')
export class ClassroomController {
    constructor(private readonly classroomService:ClassroomService) {}

    @Post('create')
    async createClassroom(@Body() createClass:CreateClass) {
        return this.classroomService.createClassroom(createClass)
    }
}
