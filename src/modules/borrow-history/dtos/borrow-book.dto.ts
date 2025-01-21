import { IsMongoId, IsNotEmpty, IsDateString } from 'class-validator';

export class BorrowBookDto {
  @IsNotEmpty()
  @IsMongoId()
  memberId: string;

  @IsNotEmpty()
  @IsMongoId()
  bookId: string;

  @IsNotEmpty()
  @IsMongoId()
  branchId: string;

  @IsNotEmpty()
  @IsDateString()
  borrowDate: string;

  @IsNotEmpty()
  @IsDateString()
  returnDate: string;
}
