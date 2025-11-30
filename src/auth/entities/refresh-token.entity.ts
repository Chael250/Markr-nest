import { User } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "REFRESH_TOKEN_TB"})
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tokenHash: string

    @ManyToOne(() => User, user => user.refreshTokens, { onDelete: 'CASCADE' })
    user: User

    @Column({ default: false })
    isRevoked: boolean

    @Column({ type: 'integer', nullable: true })
    replacedByTokenId: number | null

    @Column({ type: 'timestamptz' })
    expiresAt: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    device: string;             // optional: "Chrome on Android" etc.

    @Column({ type: 'varchar', length: 45, nullable: true })
    ip: string;

    @CreateDateColumn()
    createdAt: Date;
}