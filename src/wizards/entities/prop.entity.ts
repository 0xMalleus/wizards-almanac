import { IsString } from 'class-validator';

export class Prop {
  @IsString()
  name: string;
}
