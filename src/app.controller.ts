import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello Friend. Put thy Rune on the Door and checkout /docs for more info.';
  }
}
