import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findUserById(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async findUserForAuthentication(username: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { username: username }, relations: ['password'] });
    }

    async removeUser(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    // For earlier testing.  To be removed.
    // async findUser(username: string): Promise<any> {
    //     return this.users.find(user => user.username === username);
    // }

    //     private readonly users = [
    //     {
    //     userID: 1,
    //     username: '1',
    //     password: '1',
    //     },
    //     {
    //     userID: 2,
    //     username: 'admin',
    //     password: '1234',
    //     },
    // ];
}
