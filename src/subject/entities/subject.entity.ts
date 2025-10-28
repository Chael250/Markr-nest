import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "SUBJECT_TB"})
export class Subject {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    marks: number

    @Column()
    hours: string

    @ManyToOne(() => Teacher, (teacher) => teacher.subjects)
    teacher: Teacher
}