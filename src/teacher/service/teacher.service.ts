import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacher } from '../dto/create-teacher.dto';
import { School } from 'src/school/entities/school.entity';
import { EntityNotFoundException } from 'src/common/exceptions/EntityNotFoundException.exception';
import { TeacherDetails } from '../dto/teacher-details.dto';

@Injectable()
export class TeacherService {
    constructor(@InjectRepository(Teacher) private readonly teacherRepository:Repository<Teacher>,
    @InjectRepository(School) private readonly schoolRepository:Repository<School>) {}

    async createTeacher(createTeacher: CreateTeacher) {
        const { schoolId, userId } = createTeacher
        const school = await this.schoolRepository.findOne({ where: { id: schoolId } })
        if (!school) throw new EntityNotFoundException('School', 'id')
        const newTeacher = this.teacherRepository.create({ school: { id: schoolId }, user: { id: userId } })
        return this.teacherRepository.save(newTeacher)
    }

    async readTeacher(id:number): Promise<TeacherDetails | undefined> {
        const theTeacher = await this.teacherRepository.findOne({ where: { id } })
        if (!theTeacher) throw new EntityNotFoundException('Teacher', 'id')

        return await this.teacherRepository
            .createQueryBuilder('teacher')
            .leftJoinAndSelect('teacher.user', 'user')
            .leftJoinAndSelect('teacher.subjects', 'subject')
            .where('teacher.id = :id', { id })
            .select([
                'user.firstName AS firstName',
                'user.lastName AS lastName',
                'user.phone AS phone',
                'user.email AS email',
                'subject.name AS subjects'
            ])
            .getRawOne()
    }

    async deleteTeacher(id:number): Promise<Teacher> {
        const theTeacher = await this.teacherRepository.findOne({ where: { id } })
        if (!theTeacher) throw new EntityNotFoundException('Teacher', 'id')
        return this.teacherRepository.remove(theTeacher)
    }
}
