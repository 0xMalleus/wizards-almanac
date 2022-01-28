import { IsString } from 'class-validator';

export class Head {
  @IsString()
  name: string;
}
