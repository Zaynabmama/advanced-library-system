import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('health-check')
  healthCheck() {
    return { message: 'Users module is up and running!' };
  }
}
