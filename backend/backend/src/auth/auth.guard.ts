import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private jwtService: JwtService) {}

/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Checks if the Authorization header of the given request is valid.
     * If it is, it will assign the payload of the token to the request object.
     * If not, it will throw an UnauthorizedException.
     * 
     * @param context The execution context of the request.
     * @returns A boolean indicating whether or not the request is allowed to proceed.
     */
/*******  dfb229ea-ca9f-44ee-98ef-4690c4d11dbe  *******/
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest(); // reference to the request object 
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('');
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('');
        }
        
        return true;
    }

/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Extracts the token from the Authorization header of the given request.
     *
     * This function expects the Authorization header to be in the format
     * "Bearer <token>", where "<token>" is the actual token. If the header
     * is not in this format, or if the type is not "Bearer", the function
     * returns undefined.
     *
     * @param request The request to extract the token from.
     * @returns The extracted token, or undefined if not found.
     */
/*******  f9e4489f-d101-4b6a-b99b-9632afe14013  *******/
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}