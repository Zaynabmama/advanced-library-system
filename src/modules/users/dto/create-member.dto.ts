import { IsNotEmpty, IsString, IsEmail, MinLength, IsDateString } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}
