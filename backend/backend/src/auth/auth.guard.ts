import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private jwtService: JwtService, private reflector: Reflector) {}


    /**
     * Checks if the incoming request is allowed to reach the route.
     * If the route is public, the authentication is skipped.
     * If the route is not public, the authentication token is extracted from the Authorization header.
     * If the token is valid, the user data is stored in the request object.
     * If the token is invalid, the request is rejected with an UnauthorizedException.
     * @param context The execution context of the incoming request.
     * @returns A boolean indicating whether the request is allowed to reach the route.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true; // If the route is public, skip authentication
        }
        
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
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}