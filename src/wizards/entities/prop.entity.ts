import { IsNotEmpty, IsString } from 'class-validator';

export class Prop {
  @IsString()
  @IsNotEmpty()
  name: string;
}
