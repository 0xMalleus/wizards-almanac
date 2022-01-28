import { Expose } from 'class-transformer';
import { IsString, IsHexColor, IsNotEmpty } from 'class-validator';

export class Background {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsHexColor()
  hex: string;
}
