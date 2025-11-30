import { HeadMaster } from "src/head-master/entities/head-master.entity";
import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "SCHOOLS_TB"})
export class School {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => HeadMaster)
    @JoinColumn()
    headMaster: HeadMaster

    @OneToMany(() => Teacher, (teacher) => teacher.school)
    teachers: Teacher[];

    @OneToMany(() => Student, (student) => student.school)
    students: Student[]
}