import { Classroom } from "src/classroom/entities/classroom.entity";
import { School } from "src/school/entities/school.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "STUDENT_TB"})
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phone: string

    @Column({ unique: true})
    email: string
    
    @Column()
    fatherName: string

    @Column()
    MotherName: string
    
    @Column()
    fatherPhone: string

    @Column()
    motherPhone: string

    @ManyToOne(() => School, (school) => school.students)
    school: School

    @ManyToOne(() => Classroom, (classroom) => classroom.students)
    classroom: Classroom
}