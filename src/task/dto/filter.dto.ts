import { IsNotEmpty, IsOptional } from 'class-validator';

export class FilterDto {
  //for search task
  @IsOptional()
  @IsNotEmpty()
  keyword: string;
}
