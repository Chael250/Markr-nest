import { Student } from "src/student/entities/student.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "GRADING_TB"})
export class Grading {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    marks: number

    @OneToOne(() => Subject)
    subject: Subject

    @OneToOne(() => Student)
    student: Student
}