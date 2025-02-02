import { Test, TestingModule } from '@nestjs/testing';
import { PostTopicsController } from './post-topics.controller';
import { PostTopicsService } from './post-topics.service';

describe('PostTopicsController', () => {
  let controller: PostTopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostTopicsController],
      providers: [PostTopicsService],
    }).compile();

    controller = module.get<PostTopicsController>(PostTopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
