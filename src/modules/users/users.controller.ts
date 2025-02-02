import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpateUserDto } from './dtos/update-user.dto';
import { User } from '@prisma/client';
import { LoginResponse, UserPayload } from './interfaces/users-login.interface';
import { ExpressRequestWuthUser } from './interfaces/express-request-with-user.interface';
import { Public } from 'src/common/decorators/public.decorator';
import { IsMineGuard } from 'src/common/guards/is-mine-guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    operationId: 'create',
  })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: CreateUserDto,
  })
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const registeredUser = await this.usersService.registerUser(createUserDto);

    const response = {
      message: 'Success registered user',
      data: registeredUser,
    };
    return response;
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Login',
    operationId: 'login',
  })
  @ApiResponse({
    status: 201,
    description: 'Success login',
    type: CreateUserDto,
  })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const { access_token, user } =
      await this.usersService.loginUser(loginUserDto);

    const response = {
      message: 'Login success',
      data: {
        ...user,
        access_token,
      },
    };

    return response;
  }

  @Get('me')
  me(@Request() req: ExpressRequestWuthUser): UserPayload {
    return req.user;
  }

  @Patch(':id')
  @UseGuards(IsMineGuard)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(+id, updateUserDto);

    const response = {
      message: `Succes update user with id ${id}`,
      data: {
        updatedUser,
      },
    };

    return response;
  }

  @Patch(':id')
  @UseGuards(IsMineGuard)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = await this.usersService.deleteUser(+id);

    const response = {
      message: `Success deleted user with id ${id}`,
      data: {
        deletedUser,
      },
    };

    return response;
  }
}
