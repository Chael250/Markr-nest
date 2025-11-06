import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolRequest } from './entities/school-request.entity';
import { HeadMaster } from 'src/head-master/entities/head-master.entity';
import { SchoolRequestService } from './service/school-request/school-request.service';
import { SchoolRequestController } from './controller/school-request/school-request.controller';
import { User } from 'src/users/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        SchoolRequest, HeadMaster, User
    ])],
    providers: [SchoolRequestService],
    controllers: [SchoolRequestController]
})
export class SchoolRequestModule {}
