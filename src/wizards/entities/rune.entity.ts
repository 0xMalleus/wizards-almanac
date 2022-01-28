import { IsString } from 'class-validator';

export class Rune {
  @IsString()
  name: string;
}
