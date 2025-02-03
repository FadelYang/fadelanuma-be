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
  findOne(
    @Param('id') id: string,
    @Request() req: ExpressRequestWithUser
  ) {
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
