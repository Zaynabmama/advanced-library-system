import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/global/decorators/public.decorator';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LoginCmsDto } from './dto/login-cms.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto.email, loginDto.passwordOrPin);
  }
  @Public()
  @Post('cms-login')
  async cmsLogin(@Body() loginCmsDto: LoginCmsDto) {
    return this.authService.cmsLogin(loginCmsDto.email, loginCmsDto.password);
  }
}
