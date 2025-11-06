import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolRequestCreate } from 'src/school-request/dto/school-request-create.dto';
import { HeadMaster } from 'src/head-master/entities/head-master.entity';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';
import { SchoolRequest } from 'src/school-request/entities/school-request.entity';
import { SchoolRequestRead } from 'src/school-request/dto/school-request-read.dto';
import { SchoolRequestUpdate } from 'src/school-request/dto/school-request-update.dto';
import { Status } from 'src/common/enum/school-request.enum';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class SchoolRequestService {
    constructor(@InjectRepository(SchoolRequest) private readonly schoolRequestRepository:Repository<SchoolRequest>,
    @InjectRepository(HeadMaster) private readonly headMasterRepository:Repository<HeadMaster>,
    @InjectRepository(User) private readonly userRepository:Repository<User>
) {}

    async createSchoolRequest(schoolRequest: SchoolRequestCreate) {
        const headMaster = await this.headMasterRepository.findOne({ where: { id: schoolRequest.masterId } })
        if (!headMaster) throw new EntityNotFoundException('HeadMaster', 'id')
        const newSchoolRequest = this.schoolRequestRepository.create({ ...schoolRequest, master: { id: schoolRequest.masterId } })
        return this.schoolRequestRepository.save(newSchoolRequest)
    }

    async readSchoolRequests(): Promise<SchoolRequestRead[]> {
        return await this.schoolRequestRepository
            .createQueryBuilder('schoolRequest')
            .leftJoinAndSelect('schoolRequest.master', 'master')
            .leftJoinAndSelect('master.user', 'user')
            .select([
                'schoolRequest.status AS status',
                'user.firstName AS masterName'
            ])
            .getRawMany()
    }

    async updateSchoolRequest(schoolRequestId: number, schoolRequestUpdate: SchoolRequestUpdate): Promise<SchoolRequestUpdate> {
        const {status} = schoolRequestUpdate

        const schoolRequest = await this.schoolRequestRepository.findOne({ where: { id: schoolRequestId } })

        if(!schoolRequest) throw new EntityNotFoundException('SchoolRequest', 'id')

        const admin = await this.userRepository.findOne({ where: { id: schoolRequestUpdate.adminId } })
        if(!admin) throw new EntityNotFoundException('Admin', 'id')
            
        const enumStatus = Status[status.toUpperCase() as keyof typeof Status];
        if (enumStatus === undefined)
            throw new NotFoundException(`Invalid status: ${ status }`
        );

        const result = await this.schoolRequestRepository
            .createQueryBuilder('schoolRequest')    
            .update(SchoolRequest)
            .set({
                status: enumStatus,
                adminName: admin.lastName
            })
            .where('id = :id', { id: schoolRequestId })
            .returning('*')
            .execute()
            
        return result.raw[0]    
    }    
}
