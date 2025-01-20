import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

export class UpdateInventoryDto {
  @IsNotEmpty()
  @IsMongoId()
  bookId: string;

  @IsNotEmpty()
  @IsNumber()
  delta: number; 
}
