import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubject } from '../dto/create-subject.dto';
import { SubjectService } from '../service/subject.service';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Post('create')
    async createSubject(@Body() createSubject: CreateSubject) {
        return this.subjectService.createSubject(createSubject)
    }
}
