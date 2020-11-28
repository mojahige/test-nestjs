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
import { ApiProperty, ApiBody } from '@nestjs/swagger';

class Create implements Prisma.UserCreateInput {
  @ApiProperty()
  name: string;
}

class Update implements Prisma.UserUpdateInput {
  @ApiProperty()
  name: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.users();
  }

  @Post()
  @ApiBody({ type: Create })
  async create(@Body() params: Prisma.UserCreateInput): Promise<User> {
    return this.userService.createUser(params);
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Put(':id')
  @ApiBody({ type: Update })
  update(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
