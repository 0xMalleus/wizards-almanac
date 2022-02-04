import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListWizardsDto extends PaginationQueryDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) =>
    stringOrArrayToArray(value).map((value) => Number(value)),
  )
  @Type(() => Number)
  @ApiProperty({
    description: 'Filters wizards by one or more ids',
  })
  id?: number[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Part or all of the name of the wizard(s)',
    example: 'of the Mount',
  })
  nameIncludes?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => stringOrArrayToArray(value))
  @ApiProperty({
    description: 'The full name of one or more backgrounds.',
    example: ['black', 'red'],
  })
  background?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => stringOrArrayToArray(value))
  @ApiProperty({
    description: 'The full name of one or more bodies.',
    example: [
      'Shoulder Cape Red',
      'Aristocrat Blue',
      'Green Scholar',
      'Orange Scholar',
    ],
  })
  body?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => stringOrArrayToArray(value))
  @ApiProperty({
    description: 'The full name of one or more heads.',
    example: ['Dream Master', 'Professor', 'Djinn', 'Woodland Shapeshifter'],
  })
  head?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => stringOrArrayToArray(value))
  @ApiProperty({
    description: 'The full name of one or more props.',
    example: [
      'None',
      'Dragon Fireworks',
      "Siren's Bell",
      "Kelpie's Fury: the Water Spell",
    ],
  })
  prop?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => stringOrArrayToArray(value))
  @ApiProperty({
    description: 'The full name of one or more familiars.',
    example: ['None', 'Blue Rat', 'Albino Rat', 'Crackerjack Crow'],
  })
  familiar?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => stringOrArrayToArray(value))
  @ApiProperty({
    description: 'The full name of one or more runes.',
    example: ['None', 'Rune of Brimstone', 'Rune of Mercury', 'Rune of Brass'],
  })
  rune?: string[];
}

// swagger & class-transformer/validator don't interact well when the value is a single string
function stringOrArrayToArray(value: string | string[]): string[] {
  if (typeof value === 'string') {
    return value.trim().split(',');
  }

  return value;
}
