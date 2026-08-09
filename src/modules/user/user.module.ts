import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from '../../repositories/user.repo';
import { userModel } from '../../models/user.model';
import { TestMiddleware } from '../../middlewares/test.middleware';
import { JwtEncryptService } from '../../common/services/jwt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[userModel],
  controllers: [UserController],
  providers: [UserService ,UserRepo ,JwtEncryptService,JwtService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(TestMiddleware)
    .forRoutes({path:'user/*',method:RequestMethod.GET})
  }
}
