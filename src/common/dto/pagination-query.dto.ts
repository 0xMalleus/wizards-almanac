import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @Min(0)
  offset?: number = 0;
}
