import { Body, Controller, Post, HttpCode, HttpStatus, Request, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() signInDto: Record<string, any>) { // DTO (Data Transfer Object)
        // Later will use a DTO class to define the shape of the request body.  See validation chapter in NestJS
        return this.authService.login(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user; // The user object is set in the request by the AuthGuard
    }
}
