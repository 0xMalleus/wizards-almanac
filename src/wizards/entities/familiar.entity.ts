import { IsString } from 'class-validator';

export class Familiar {
  @IsString()
  name: string;
}
