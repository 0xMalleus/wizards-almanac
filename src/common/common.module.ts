import { Module } from '@nestjs/common';
import { QueueService } from './queue/queue.service';

@Module({
  providers: [QueueService],
  exports: [QueueService],
})
export class CommonModule {}
