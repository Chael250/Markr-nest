import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { HeadMasterModule } from './head-master/head-master.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';
import { ClassroomModule } from './classroom/classroom.module';
import { GradingModule } from './grading/grading.module';
import { SchoolRequestModule } from './school-request/school-request.module';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './school/school.module';
import { Classroom } from './classroom/entities/classroom.entity';
import { Grading } from './grading/entities/grading.entity';
import { HeadMaster } from './head-master/entities/head-master.entity';
import { School } from './school/entities/school.entity';
import { SchoolRequest } from './school-request/entities/school-request.entity';
import { Student } from './student/entities/student.entity';
import { Subject } from 'rxjs';
import { Teacher } from './teacher/entities/teacher.entity';
import { User } from './users/entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Classroom, Grading, HeadMaster, School, SchoolRequest, Student, Subject, Teacher, User],
        autoLoadEntities: true,
        synchronize: true, // only for dev
      }),
    }),
    UsersModule,
    HeadMasterModule,
    TeacherModule,
    SubjectModule,
    StudentModule,
    ClassroomModule,
    GradingModule,
    SchoolModule,
    SchoolRequestModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
