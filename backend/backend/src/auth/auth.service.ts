import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // This service will handle authentication logic
    // For example, user login, registration, token generation, etc.
    
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        ) {}
    
    async login(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findUserForAuthentication(username);
        if (!user || !user.password) {
            throw new UnauthorizedException();
        }    
        
        const isPasswordValid = await bcrypt.compare(pass, user.password.hashedPassword);
        const payload = { subject: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
