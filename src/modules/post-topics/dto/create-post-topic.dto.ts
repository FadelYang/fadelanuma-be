import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, Validate } from 'class-validator';
import { IsSlugVaid } from 'src/common/validators/is-slug.validator';

export class CreatePostTopicDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @Validate(IsSlugVaid)
  slug: string

  description: string
}
