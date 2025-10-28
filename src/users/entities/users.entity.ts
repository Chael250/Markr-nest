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
}