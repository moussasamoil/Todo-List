import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')// this only for swagger
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

}
