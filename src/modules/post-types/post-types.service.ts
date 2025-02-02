import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostTypeDto } from './dto/create-post-type.dto';
import { UpdatePostTypeDto } from './dto/update-post-type.dto';
import { PrismaService } from 'src/core/services/prisma/prisma.service';

@Injectable()
export class PostTypesService {
  constructor(private prisma: PrismaService) {}

  async create(createPostTypeDto: CreatePostTypeDto) {
    try {
      const newPostType = await this.prisma.postType.create({
        data: {
          name: createPostTypeDto.name,
          slug: createPostTypeDto.slug,
          description: createPostTypeDto.description,
        },
      });

      return newPostType;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Post type already exists');
      }

      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const postTypes = await this.prisma.postType.findMany();

      return postTypes;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: number) {
    try {
      const postType = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      return postType;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post type with id ${id} not found`);
      }

      throw new HttpException(error, 500);
    }
  }

  async update(id: number, updatePostTypeDto: UpdatePostTypeDto) {
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      const updatedPostType = await this.prisma.postType.update({
        where: { id },
        data: {
          ...updatePostTypeDto,
        },
      });

      return updatedPostType;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post type with id ${id} not found`);
      }

      if (error.code === 'P2002') {
        throw new ConflictException('Post type already exist');
      }
    }
  }

  async remove(id: number) {
    try {
      const postType = await this.prisma.postType.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.postType.delete({
        where: { id },
      });

      return `Post type with id ${id} deleted`;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post type with ${id} not found`);
      }

      throw new HttpException(error, 500);
    }
  }
}
