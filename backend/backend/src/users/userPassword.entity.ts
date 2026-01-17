import { Entity, Column, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class UserPassword {

    @PrimaryColumn()
    userID: number;

    @Column()
    hashedPassword: string;

    @OneToOne(() => User, user => user.password, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}