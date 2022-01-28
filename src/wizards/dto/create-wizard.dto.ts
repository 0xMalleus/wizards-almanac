import {
  IsHexColor,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWizardDto {
  @IsNumber()
  @Min(0)
  @Max(9999, { message: 'Wizard ID must be less than or equal to 9999' })
  id: number;
  @IsString()
  name: string;
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  image: string;
  @IsHexColor()
  backgroundColor: string;
}
