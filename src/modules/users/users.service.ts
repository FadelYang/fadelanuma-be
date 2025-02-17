import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserPayload } from './interfaces/users-login.interface';
import { UpateUserDto } from './dtos/update-user.dto';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          birthDate: createUserDto.birtDate,
          password: await hash(createUserDto.password, 10),
        },
      });

      delete newUser.password;

      return newUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }

      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException('Invalid input data' + error);
      }

      throw new HttpException(error, 500);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginUserDto.email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!(await compare(loginUserDto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };

      const access_token = await this.jwtService.signAsync(payload);

      const { password, ...userWithoutPassword } = user;

      return {
        access_token,
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async updateUser(id: number, updateUserDto: UpateUserDto): Promise<User> {
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          ...(updateUserDto.password && {
            password: await hash(updateUserDto.password, 10),
          }),
        },
      });

      delete updateUserDto.password;

      return updatedUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }

      throw new HttpException(error, 500);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.user.delete({
        where: { id },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      throw new HttpException(error, 500);
    }
  }
}
