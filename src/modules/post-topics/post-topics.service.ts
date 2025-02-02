import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreatePostTopicDto } from './dto/create-post-topic.dto';
import { UpdatePostTopicDto } from './dto/update-post-topic.dto';
import { PrismaService } from 'src/core/services/prisma/prisma.service';
import { ExpressRequestWuthUser } from '../users/interfaces/express-request-with-user.interface';

@Injectable()
export class PostTopicsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostTopicDto: CreatePostTopicDto, req: ExpressRequestWuthUser) {
    try {
      const userId = req.user.sub;
      
      const newPostTopic = await this.prisma.postTopic.create({
       data: {
         userId,
         name: createPostTopicDto.name,
         slug: createPostTopicDto.slug,
         description: createPostTopicDto.description,
       },
      });

      return newPostTopic;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Post type already exists')
      }

      throw new HttpException(error, 500)
    }
  }

  findAll() {
    return `This action returns all postTopics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postTopic`;
  }

  update(id: number, updatePostTopicDto: UpdatePostTopicDto) {
    return `This action updates a #${id} postTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} postTopic`;
  }
}
