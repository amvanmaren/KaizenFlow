import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users = [
        {
        userID: 1,
        username: 'test',
        password: '123',
        },
        {
        userID: 2,
        username: 'admin',
        password: '123',
        },
    ];

    async findOne(username: string): Promise<any> {
        return this.users.find(user => user.username === username);
    }
}
