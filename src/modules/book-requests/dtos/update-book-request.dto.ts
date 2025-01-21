import { IsEnum, IsOptional } from 'class-validator';

export class UpdateBookRequestDto {
  @IsEnum(['approved', 'rejected'])
  status: string;

  @IsOptional()
  approvalDate?: Date;
}
