import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import PQueue from 'p-queue';

// This wrapper is kind of leaky, would like to refactor after more thought.
@Injectable()
export class QueueService {
  constructor(private readonly configService: ConfigService) {}

  private readonly queues: { [key: string]: PQueue } = {};

  public getQueue(name: string): PQueue {
    if (!this.queues[name]) {
      this.queues[name] = new PQueue({
        intervalCap: this.configService.get<number>('QUEUE_INTERVAL_CAP'),
        interval: this.configService.get<number>('QUEUE_INTERVAL'),
      });
    }

    return this.queues[name];
  }
}
