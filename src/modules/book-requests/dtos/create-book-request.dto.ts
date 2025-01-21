import { IsInt, IsNotEmpty, Min, IsString } from 'class-validator';

export class CreateBookRequestDto {
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
  minimumAge: number;

  @IsNotEmpty()
  requestedCopies: number;
}
