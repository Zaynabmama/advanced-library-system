import { IsNotEmpty, IsString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  minAgeRequirement: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfCopies: number;

  @IsNotEmpty()
  @IsString()
  coverImageUrl: string;

  @IsNotEmpty()
  @IsString()
  pdfUrl: string;

  @IsNotEmpty()
  @IsMongoId()
  authorId: string;

}
