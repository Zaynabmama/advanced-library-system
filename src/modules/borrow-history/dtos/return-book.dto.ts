import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ReturnBookDto {
  @IsNotEmpty()
  @IsMongoId()
  borrowId: string;
}
