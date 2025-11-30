import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SchoolRequestCreate } from 'src/school-request/dto/school-request-create.dto';
import { SchoolRequestUpdate } from 'src/school-request/dto/school-request-update.dto';
import { SchoolRequestService } from 'src/school-request/service/school-request/school-request.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('school-request')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SchoolRequestController {
    constructor(
        private readonly schoolRequestService: SchoolRequestService
    ) {}

    @Post('create')
    @Roles('master')
    createSchoolRequest(@Body() schoolRequest: SchoolRequestCreate) {
        return this.schoolRequestService.createSchoolRequest(schoolRequest)
    }

    @Get('read')
    @Roles('admin')
    readSchoolRequests() {
        return this.schoolRequestService.readSchoolRequests()
    }

    @Patch('update/:id')
    @Roles('admin')
    updateSchoolRequests(@Param('id') schoolRequestId: number, @Body() updateSchoolRequest: SchoolRequestUpdate) {
        return this.schoolRequestService.updateSchoolRequest(schoolRequestId, updateSchoolRequest)
    }
}
