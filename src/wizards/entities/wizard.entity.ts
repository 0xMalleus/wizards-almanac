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
  name: string;
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  image: string;
  @Type(() => Background)
  background: Background;
  @Type(() => Body)
  body: Body;
  @Type(() => Head)
  head: Head;
  @Type(() => Prop)
  prop: Prop;
  @Type(() => Familiar)
  familiar: Familiar;
  @Type(() => Rune)
  rune: Rune;
}
