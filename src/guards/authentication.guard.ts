import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtEncryptService } from '../common/services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private readonly  jwtEncryptService:JwtEncryptService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    //console.log(context)
    const request = context.switchToHttp().getRequest();
    //console.log(request.headers)
    const token = this.extractTokenFromHeader(request);
    console.log('token',token);
    if (!token) {
      throw new UnauthorizedException();
    }
    else {
      try {
        const payload = await this.jwtEncryptService.verifyToken(token);
        console.log('payload' , payload);
        request['user'] = payload;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers?.authorization || request.headers?.Authorization;
    //console.log(authHeader)
    if (!authHeader) {
      return null;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' && token ? token : null;
  }
}


