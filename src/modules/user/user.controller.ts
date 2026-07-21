import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('signUp')
  signUp(@Body() body: userDto) {
    return this.userService.signUp(body);
  }
}
