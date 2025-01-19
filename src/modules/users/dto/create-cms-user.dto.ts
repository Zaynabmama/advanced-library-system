import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateCmsUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  roleId: string;
}
