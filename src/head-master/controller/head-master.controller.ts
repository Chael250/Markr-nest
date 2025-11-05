import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { HeadMasterService } from '../service/head-master.service';
import { HeadMaster } from '../entities/head-master.entity';
import { CreateMaster } from '../dtos/create-master.dto';

@Controller('head-master')
export class HeadMasterController {
    constructor(private readonly headMasterService: HeadMasterService) {}

    @Get()
    findAll(): Promise<HeadMaster[]> {
        return this.headMasterService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<HeadMaster> {
        return this.headMasterService.findOne(id);
    }

    @Post()
    create(@Body() headMaster: CreateMaster): Promise<HeadMaster> {
        return this.headMasterService.create(headMaster);
    }
    
    @Patch(':id')
    update(@Param('id') id: number, @Body() headMaster: HeadMaster): Promise<HeadMaster> {
        return this.headMasterService.update(id, headMaster);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.headMasterService.delete(id);
    }
}