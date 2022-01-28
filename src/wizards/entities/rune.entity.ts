import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class Rune {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}
