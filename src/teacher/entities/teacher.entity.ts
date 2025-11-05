import { School } from "src/school/entities/school.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { User } from "src/users/entities/users.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "TEACHER_TB"})
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => School)
    @JoinColumn()
    school: School

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => Subject, (lesson) => lesson.teacher)
    subjects: Subject[]
}