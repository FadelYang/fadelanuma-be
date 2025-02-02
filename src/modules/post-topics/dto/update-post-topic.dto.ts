import { PartialType } from '@nestjs/swagger';
import { CreatePostTopicDto } from './create-post-topic.dto';

export class UpdatePostTopicDto extends PartialType(CreatePostTopicDto) {}
