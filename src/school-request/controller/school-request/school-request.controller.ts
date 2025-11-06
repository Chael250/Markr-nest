import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SchoolRequestCreate } from 'src/school-request/dto/school-request-create.dto';
import { SchoolRequestUpdate } from 'src/school-request/dto/school-request-update.dto';
import { SchoolRequestService } from 'src/school-request/service/school-request/school-request.service';

@Controller('school-request')
export class SchoolRequestController {
    constructor(
        private readonly schoolRequestService: SchoolRequestService
    ) {}

    @Post('create')
    createSchoolRequest(@Body() schoolRequest: SchoolRequestCreate) {
        return this.schoolRequestService.createSchoolRequest(schoolRequest)
    }

    @Get('read')
    readSchoolRequests() {
        return this.schoolRequestService.readSchoolRequests()
    }

    @Patch('update/:id')
    updateSchoolRequests(@Param('id') schoolRequestId: number, @Body() updateSchoolRequest: SchoolRequestUpdate) {
        return this.schoolRequestService.updateSchoolRequest(schoolRequestId, updateSchoolRequest)
    }
}
