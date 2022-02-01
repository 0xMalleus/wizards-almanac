import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

import { Background } from '../entities/background.entity';
import { Body } from '../entities/body.entity';
import { Head } from '../entities/head.entity';
import { Prop } from '../entities/prop.entity';
import { Familiar } from '../entities/familiar.entity';
import { Rune } from '../entities/rune.entity';

export class UpsertWizardDto {
  @IsNumber()
  @Min(0)
  @Max(9999, { message: 'Wizard ID must be less than or equal to 9999' })
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  image: string;

  @ValidateNested()
  @Type(() => Background)
  background: Background;

  @ValidateNested()
  @Type(() => Body)
  body: Body;

  @ValidateNested()
  @Type(() => Head)
  head: Head;

  @ValidateNested()
  @Type(() => Prop)
  prop: Prop;

  @ValidateNested()
  @Type(() => Familiar)
  familiar: Familiar;

  @ValidateNested()
  @Type(() => Rune)
  rune: Rune;
}
