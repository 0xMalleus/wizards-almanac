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
import { WizardTrait } from './trait.entity';

export class Wizard {
  @IsNumber()
  @Min(0)
  @Max(10000, { message: 'Wizard ID must be less than 10000' })
  id: number;
  @IsString()
  name: string;
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  image: string;
  @IsHexColor()
  backgroundColor: string;
  @ValidateNested()
  @Type(() => WizardTrait)
  traits: WizardTrait[];
}
