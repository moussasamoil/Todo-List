import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from '../../repositories/user.repo';
import { userModel } from '../../models/user.model';
import { TestMiddleware } from '../../middlewares/test.middleware';

@Module({
  imports:[userModel],
  controllers: [UserController],
  providers: [UserService ,UserRepo],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(TestMiddleware)
    .forRoutes({path:'user/*',method:RequestMethod.GET})
  }
}
