import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../guards/authentication.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

}
