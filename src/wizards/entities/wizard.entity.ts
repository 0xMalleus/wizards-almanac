import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { Background } from './background.entity';
import { Body } from './body.entity';
import { Head } from './head.entity';
import { Prop } from './prop.entity';
import { Familiar } from './familiar.entity';
import { Rune } from './rune.entity';

export class Wizard {
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
