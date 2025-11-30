import { School } from "src/school/entities/school.entity";
import { Subject } from "src/subject/entities/subject.entity";
import { User } from "src/users/entities/users.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "TEACHER_TB"})
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => School, (school) => school.teachers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'schoolId' })
    school: School;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => Subject, (lesson) => lesson.teacher)
    subjects: Subject[]
}