import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    // This service will handle authentication logic
    // For example, user login, registration, token generation, etc.
    
    constructor(private usersService: UsersService) {}
    
    async login(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }    
    
    const {password, ...result} = user;
    // TODO: Generate and return a JWT instead of user object.

    return result; 

    }
}
