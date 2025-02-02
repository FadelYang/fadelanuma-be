import { Test, TestingModule } from '@nestjs/testing';
import { PostTopicsService } from './post-topics.service';

describe('PostTopicsService', () => {
  let service: PostTopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostTopicsService],
    }).compile();

    service = module.get<PostTopicsService>(PostTopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
