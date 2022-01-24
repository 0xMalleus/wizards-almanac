import {
  IsHexColor,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
  validateSync,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WizardTrait } from './trait.entity';

export class Wizard {
  @IsNumber()
  @Min(0)
  @Max(10000, { message: 'Wizard ID must be less than 10000' })
  readonly id: number;
  @IsString()
  readonly name: string;
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  readonly image: string;
  @IsHexColor()
  readonly backgroundColor: string;
  @ValidateNested()
  @Type(() => WizardTrait)
  readonly traits: WizardTrait[];
}
