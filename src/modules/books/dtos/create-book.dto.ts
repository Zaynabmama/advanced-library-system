import { IsNotEmpty, IsNumber, IsString, IsMongoId } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsString()
  ISBN: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  minimumAge: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfCopies: number;

  @IsNotEmpty()
  @IsMongoId()
  authorId: string;

  @IsNotEmpty()
  openToReview: boolean;
}
