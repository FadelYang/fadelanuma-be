import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsSlugVaid } from 'src/common/validators/is-slug.validator';

export class CreatePostTypeDto {
  @ApiProperty({
    example: 'Mini Course',
    description: 'The name of post type',
    type: String
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'mini-course',
    description: 'The slug of post type, generate with post name',
    type: String
  })
  @IsNotEmpty()
  @Validate(IsSlugVaid)
  slug: string;

  @ApiProperty({
    example: 'The mini course you can finish in one day',
    description: 'The description of post type',
    type: String
  })
  description: string;
}
