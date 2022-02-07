import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiTags('hello')
  getHello(): string {
    return "Φ Ψ λ ϐ ҩ Ӝ ⊙ ⚧ ⚭ Ω Welcome to the Wizards' Almanac Φ Ψ λ ϐ ҩ Ӝ ⊙ ⚧ ⚭ Ω -- checkout /docs for more info.";
  }
}
