import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class Head {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;
}
