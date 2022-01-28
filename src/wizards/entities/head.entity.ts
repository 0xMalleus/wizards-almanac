import { IsNotEmpty, IsString } from 'class-validator';

export class Head {
  @IsString()
  @IsNotEmpty()
  name: string;
}
