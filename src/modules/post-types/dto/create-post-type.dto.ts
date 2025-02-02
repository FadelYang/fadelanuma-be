import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, Validate } from 'class-validator';
import { IsSlugVaid } from 'src/common/validators/is-slug.validator';

export class CreatePostTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsSlugVaid)
  slug: string;

  @ApiProperty()
  description: string;
}
