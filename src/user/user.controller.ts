import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.users();
  }

  @Post()
  async create(@Body() params: Prisma.UserCreateInput): Promise<User> {
    return this.userService.createUser(params);
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('name') name: string): Promise<User> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: { name },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
