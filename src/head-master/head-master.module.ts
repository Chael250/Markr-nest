import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeadMaster } from './entities/head-master.entity';
import { User } from 'src/users/entities/users.entity';
import { HeadMasterController } from './controller/head-master.controller';
import { HeadMasterService } from './service/head-master.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        HeadMaster, User
    ])],
    controllers: [HeadMasterController],
    providers: [HeadMasterService]
})
export class HeadMasterModule {}
