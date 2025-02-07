import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostTopicDto } from './dto/create-post-topic.dto';
import { UpdatePostTopicDto } from './dto/update-post-topic.dto';
import { PrismaService } from 'src/core/services/prisma/prisma.service';
import { ExpressRequestWithUser } from '../users/interfaces/express-request-with-user.interface';

@Injectable()
export class PostTopicsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPostTopicDto: CreatePostTopicDto,
    req: ExpressRequestWithUser,
  ) {
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
        throw new ConflictException('Post type already exists');
      }

      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const postTopics = await this.prisma.postTopic.findMany({
        distinct: ['name'],
      });

      return postTopics;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findByMe(req: ExpressRequestWithUser) {
    try {
      const userId = req.user.sub;
      const postTopicsByMe = await this.prisma.postTopic.findMany({
        where: {
          userId: userId,
        },
      });

      return postTopicsByMe;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: number) {
    try {
      const postTopic = await this.prisma.postTopic.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      return postTopic;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Post type already exists');
      }

      throw new HttpException(error, 500);
    }
  }

  async update(id: number, updatePostTopicDto: UpdatePostTopicDto) {
    try {
      await this.prisma.postTopic.findUniqueOrThrow({
        where: { id },
      });

      const updatedPostTopic = await this.prisma.postTopic.update({
        where: { id },
        data: {
          ...updatePostTopicDto,
        },
      });

      return updatedPostTopic;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post topic with id ${id} not found`);
      }

      if (error.code === 'P2002') {
        throw new ConflictException('Post type already exist');
      }
    }
  }

  async remove(id: number) {
    try {
      const postTopic = await this.prisma.postTopic.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.postTopic.delete({
        where: { id },
      });

      return postTopic;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post topic with id ${id} not found`);
      }

      throw new HttpException(error, 500);
    }
  }
}
