import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostTypesService } from './post-types.service';
import { CreatePostTypeDto } from './dto/create-post-type.dto';
import { UpdatePostTypeDto } from './dto/update-post-type.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('post-types')
export class PostTypesController {
  constructor(private readonly postTypesService: PostTypesService) {}

  @Post()
  async create(@Body() createPostTypeDto: CreatePostTypeDto) {
    const newPostTypeDto =
      await this.postTypesService.create(createPostTypeDto);

    const response = {
      message: 'Success crete new post type',
      data: newPostTypeDto,
    };

    return response;
  }

  @Public()
  @Get()
  async findAll() {
    const postTypes = await this.postTypesService.findAll();

    const response = {
      message: 'Success get all post types',
      data: postTypes,
    };

    return response;
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const postType = await this.postTypesService.findOne(+id);

    const response = {
      message: `Success get post type with id ${postType.id}`,
      data: postType,
    };

    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostTypeDto: UpdatePostTypeDto,
  ) {
    const updatedPostType = await this.postTypesService.update(
      +id,
      updatePostTypeDto,
    );

    const response = {
      message: `Success updated post type with id ${id}`,
      data: updatedPostType,
    };

    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedPostType = await this.postTypesService.remove(+id);

    const response = {
      message: `Success deleted post type with id ${id}`,
      data: deletedPostType,
    };

    return response;
  }
}
