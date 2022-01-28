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

import { Background } from './background.entity';
import { Body } from './body.entity';
import { Head } from './head.entity';
import { Prop } from './prop.entity';
import { Familiar } from './familiar.entity';
import { Rune } from './rune.entity';

export class Wizard {
  @Expose()
  @IsNumber()
  @Min(0)
  @Max(9999, { message: 'Wizard ID must be less than or equal to 9999' })
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  image: string;

  @Expose()
  @ValidateNested()
  @Type(() => Background)
  background: Background;

  @Expose()
  @ValidateNested()
  @Type(() => Body)
  body: Body;

  @Expose()
  @ValidateNested()
  @Type(() => Head)
  head: Head;

  @Expose()
  @ValidateNested()
  @Type(() => Prop)
  prop: Prop;

  @Expose()
  @ValidateNested()
  @Type(() => Familiar)
  familiar: Familiar;

  @Expose()
  @ValidateNested()
  @Type(() => Rune)
  rune: Rune;
}
