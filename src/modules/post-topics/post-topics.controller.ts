import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { PostTopicsService } from './post-topics.service';
import { CreatePostTopicDto } from './dto/create-post-topic.dto';
import { UpdatePostTopicDto } from './dto/update-post-topic.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ExpressRequestWuthUser } from '../users/interfaces/express-request-with-user.interface';

@ApiBearerAuth('access-token')
@Controller('post-topics')
export class PostTopicsController {
  constructor(private readonly postTopicsService: PostTopicsService) {}

  @Post()
  create(
    @Request() req: ExpressRequestWuthUser,
    @Body() createPostTopicDto: CreatePostTopicDto,
  ) {
    return this.postTopicsService.create(createPostTopicDto, req);
  }

  @Get()
  findAll() {
    return this.postTopicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postTopicsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostTopicDto: UpdatePostTopicDto,
  ) {
    return this.postTopicsService.update(+id, updatePostTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postTopicsService.remove(+id);
  }
}
