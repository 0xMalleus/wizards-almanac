import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return "Φ Ψ λ ϐ ҩ Ӝ ⊙ ⚧ ⚭ Ω Welcome to the Wizards' Almanac Φ Ψ λ ϐ ҩ Ӝ ⊙ ⚧ ⚭ Ω -- checkout /docs for more info.";
  }
}
