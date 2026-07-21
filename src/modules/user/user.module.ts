import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepo } from '../../repositories/user.repo';
import { userModel } from '../../models/user.model';

@Module({
  imports:[userModel],
  controllers: [UserController],
  providers: [UserService ,UserRepo],
})
export class UserModule {
}
