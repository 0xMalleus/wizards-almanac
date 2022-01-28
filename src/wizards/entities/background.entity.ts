import { plainToInstance } from 'class-transformer';
import { IsString, IsHexColor, validateSync } from 'class-validator';

export type BackgroundProps = Pick<Background, 'name' | 'backgroundColorHex'>;

export class Background {
  @IsString()
  name: string;
  @IsHexColor()
  backgroundColorHex: string;
}
