import { IsString } from 'class-validator';

export class Body {
  @IsString()
  name: string;
}
