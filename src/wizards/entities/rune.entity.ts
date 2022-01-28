import { IsNotEmpty, IsString } from 'class-validator';

export class Rune {
  @IsString()
  @IsNotEmpty()
  name: string;
}
