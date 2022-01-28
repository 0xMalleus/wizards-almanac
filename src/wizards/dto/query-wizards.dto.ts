import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

import { IsOptional } from 'class-validator';

export class QueryWizardsDto extends PaginationQueryDto {
  @IsOptional()
  name: string;
  @IsOptional()
  background: string;
  @IsOptional()
  body: string;
  @IsOptional()
  head: string;
  @IsOptional()
  prop: string;
  @IsOptional()
  familiar: string;
  @IsOptional()
  rune: string;
}
