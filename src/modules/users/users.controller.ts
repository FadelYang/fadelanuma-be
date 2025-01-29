import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpateUserDto } from './dtos/update-user.dto';
import { User } from '@prisma/client';
import { LoginResponse } from './interfaces/users-login.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.registerUser(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.usersService.loginUser(loginUserDto);
  }

  @Get('me')
  me(): string {
    return 'Get my profile';
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpateUserDto,
  ): Promise<User> {
    console.log(updateUserDto);
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Patch(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<String> {
    return this.usersService.deleteUser(+id);
  }
}
