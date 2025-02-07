import { PostTopic } from './entities/post-topic.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostTopicsService } from './post-topics.service';
import { CreatePostTopicDto } from './dto/create-post-topic.dto';
import { UpdatePostTopicDto } from './dto/update-post-topic.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ExpressRequestWithUser } from '../users/interfaces/express-request-with-user.interface';
import { IsMineGuard } from 'src/common/guards/is-mine-guard';

@ApiBearerAuth('access-token')
@Controller('post-topics')
export class PostTopicsController {
  constructor(private readonly postTopicsService: PostTopicsService) {}

  @Post()
  async create(
    @Request() req: ExpressRequestWithUser,
    @Body() createPostTopicDto: CreatePostTopicDto,
  ) {
    const newPostTopic = await this.postTopicsService.create(
      createPostTopicDto,
      req,
    );

    const response = {
      message: 'Success create new post topic',
      data: newPostTopic,
    };

    return response;
  }

  @Get()
  async findAll() {
    const postTopics = await this.postTopicsService.findAll();

    const response = {
      message: 'Success get all post topics data',
      data: postTopics,
    };

    return response;
  }

  @Get()
  @UseGuards(IsMineGuard)
  async findByMe(@Request() req: ExpressRequestWithUser) {
    const postTopicsByMe = await this.postTopicsService.findByMe(req);

    const response = {
      message: 'Success get all post topics created by you',
      data: postTopicsByMe,
    };

    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const PostTopic = await this.postTopicsService.findOne(+id);

    const response = {
      message: 'Success get post topic data',
      data: PostTopic,
    };

    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostTopicDto: UpdatePostTopicDto,
  ) {
    const updatedPostTopic = await this.postTopicsService.update(
      +id,
      updatePostTopicDto,
    );

    const response = {
      message: `Success updated post topic with id ${id}`,
      data: updatedPostTopic,
    };

    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedPostTopic = await this.postTopicsService.remove(+id);

    const response = {
      message: `Success deleted post topic with id ${id}`,
      data: deletedPostTopic,
    };

    return response;
  }
}
