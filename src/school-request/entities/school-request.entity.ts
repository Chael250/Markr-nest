import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./enum/school-request.enum";
import { HeadMaster } from "src/head-master/entities/head-master.entity";

@Entity({ name: "REQUEST_TB"})
export class SchoolRequest {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: Status.PENDING })
    status: Status

    @OneToOne(() => HeadMaster)
    @JoinColumn()
    master: HeadMaster

    @Column({ nullable: true})
    adminName: string
}