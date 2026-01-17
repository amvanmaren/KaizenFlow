import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,  } from 'typeorm';
import { UserPassword } from './userPassword.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @OneToOne(() => UserPassword, userPassword => userPassword.user)
    password: UserPassword;
    
}