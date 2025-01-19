import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCmsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
