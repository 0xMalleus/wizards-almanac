import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class Prop {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}
