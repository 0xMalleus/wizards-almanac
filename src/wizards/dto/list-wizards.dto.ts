import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ListWizardsDto extends PaginationQueryDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  id?: number[];

  @IsOptional()
  @IsString()
  nameIncludes?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  background?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  body: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  head: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  prop: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  familiar: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  rune: string;
}
