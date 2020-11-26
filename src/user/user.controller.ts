import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async users(): Promise<User[]> {
    return this.userService.users();
  }

  @Post()
  async create(@Body() params: Prisma.UserCreateInput): Promise<User> {
    return this.userService.createUser(params);
  }
}
