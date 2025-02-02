import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsSlugVaid } from 'src/common/validators/is-slug.validator';

export class CreatePostTopicDto {
  @ApiProperty({
    example: 'Web Development',
    description: 'The name of post topic',
    type: String
  })
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 'web-development',
    description: 'The slug of post type, generate with post name',
    type: String
  })
  @IsNotEmpty({})
  @Validate(IsSlugVaid)
  slug: string

  @ApiProperty({
    example: 'The topic that talk about web development in general',
    description: 'The description of post topic',
    type: String
  })
  description: string
}
