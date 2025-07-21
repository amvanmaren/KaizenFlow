import { Injectable } from '@nestjs/common';


// Hardcoded user data for demonstration purposes
// Later possible to build user model and persistence layer using other library (TypeORM, Sequelize, Mongoose, etc.))
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

    async findUser(username: string): Promise<any> {
        return this.users.find(user => user.username === username);
    }
}
