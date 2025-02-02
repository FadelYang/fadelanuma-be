import { Test, TestingModule } from '@nestjs/testing';
import { PostTypesService } from './post-types.service';

describe('PostTypesService', () => {
  let service: PostTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostTypesService],
    }).compile();

    service = module.get<PostTypesService>(PostTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
