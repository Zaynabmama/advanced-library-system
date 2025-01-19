import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    password: string;
  
    @IsDateString()
    birthDate: Date;
  }
  