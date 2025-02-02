import { Module } from '@nestjs/common';
import { PostTopicsService } from './post-topics.service';
import { PostTopicsController } from './post-topics.controller';

@Module({
  controllers: [PostTopicsController],
  providers: [PostTopicsService],
})
export class PostTopicsModule {}
