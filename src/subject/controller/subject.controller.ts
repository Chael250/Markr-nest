import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateSubject } from '../dto/create-subject.dto';
import { SubjectService } from '../service/subject.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('subject')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('teacher', 'admin')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Post('create')
    async createSubject(@Body() createSubject: CreateSubject) {
        return this.subjectService.createSubject(createSubject)
    }
}
