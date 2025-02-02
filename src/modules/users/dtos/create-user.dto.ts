import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'The email of new user.',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'super_strong_password',
    description: 'The password of new user.',
    type: String,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Jhon Doe',
    description: 'The full name of new user.',
    type: String,
  })
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2002-02-02T08:11:56.888Z',
    description: 'The birthdate of new user.',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birtDate: Date;
}
