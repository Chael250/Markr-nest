import { School } from "src/school/entities/school.entity";
import { Student } from "src/student/entities/student.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "CLASSROOM_TB"})
export class Classroom {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    totalStudents: number

    @OneToOne(() => Teacher)
    @JoinColumn()
    headTeacher: Teacher

    @OneToMany(() => Student, (student) => student.classroom)
    students: Student[]
}