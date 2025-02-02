import { Test, TestingModule } from '@nestjs/testing';
import { PostTypesController } from './post-types.controller';
import { PostTypesService } from './post-types.service';

describe('PostTypesController', () => {
  let controller: PostTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostTypesController],
      providers: [PostTypesService],
    }).compile();

    controller = module.get<PostTypesController>(PostTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
