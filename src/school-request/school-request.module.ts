import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolRequest } from './entities/school-request.entity';
import { HeadMaster } from 'src/head-master/entities/head-master.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        SchoolRequest, HeadMaster
    ])]
})
export class SchoolRequestModule {}
