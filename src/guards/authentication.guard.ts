import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtEncryptService } from '../common/services/jwt.service';
import { Reflector } from '@nestjs/core';
import { isPublicKey } from '../common/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtEncryptService: JwtEncryptService,
    private reflector: Reflector
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    let isPublic = this.reflector.getAllAndOverride<boolean>(
      isPublicKey,
      [
        context.getHandler(),
        context.getClass()
      ]
    )
    // console.log('is public' ,isPublic)
    if (isPublic) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    // console.log('request',request.headers)
    const token = this.extractTokenFromHeader(request);
    // console.log('token', token);
    if (!token) {
      throw new UnauthorizedException();
    }
    else {
      try {
        const payload = await this.jwtEncryptService.verifyToken(token);
        console.log('payload', payload);
        request['user'] = payload;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers?.authorization || request.headers?.Authorization;
    // console.log('authHeader',authHeader)
    if (!authHeader) {
      return null;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' && token ? token : null;
  }
}


