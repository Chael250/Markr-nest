import { UserRole } from "src/common/enum/user-role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "USERS_TB"})
export class User {
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
    password: string

    @Column({ enum: UserRole})
    role: string
}