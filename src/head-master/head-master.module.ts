import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeadMaster } from './entities/head-master.entity';
import { User } from 'src/users/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        HeadMaster, User
    ])]
})
export class HeadMasterModule {}
