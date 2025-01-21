import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

export class DistributeBookDto {
  @IsNotEmpty()
  @IsMongoId()
  bookId: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfCopies: number;

  @IsNotEmpty()
  @IsNumber()
  borrowableDays: number;
}
