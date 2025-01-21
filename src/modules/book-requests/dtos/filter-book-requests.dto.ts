import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterBookRequestsDto {
  @IsOptional()
  @IsEnum(['pending', 'approved', 'rejected'])
  status?: string;

  @IsOptional()
  @IsString()
  authorId?: string;
}
