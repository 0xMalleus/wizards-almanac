import { IsNotEmpty, IsString } from 'class-validator';

export class Familiar {
  @IsString()
  @IsNotEmpty()
  name: string;
}
