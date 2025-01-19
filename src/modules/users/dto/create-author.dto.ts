import { IsNotEmpty, IsEmail, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedTextDto {
  @IsNotEmpty()
  @IsString()
  en: string;

  @IsNotEmpty()
  @IsString()
  ar: string;
}

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ValidateNested() 
  @Type(() => LocalizedTextDto) 
  name: LocalizedTextDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  biography: LocalizedTextDto;

  @IsNotEmpty()
  @IsString()
  profileImageUrl: string;
}
