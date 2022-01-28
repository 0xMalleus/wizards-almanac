import { IsString, IsHexColor, IsNotEmpty } from 'class-validator';

export class Background {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsHexColor()
  hex: string;
}
