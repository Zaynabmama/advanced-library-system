import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { OtpService } from '../services/otp.service';
import { Messages } from 'src/global/message';
import { Public } from 'src/global/decorators/public.decorator';
import { CreateMemberDto } from '../dto/create-member.dto';

@Controller('members')
export class MembersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OtpService,
  ) {}


  @Public()
  @Post('send-otp')
  async sendOtpForRegistration(@Body('email') email: string) {
    await this.otpService.createOtpForMember(email);
    return {
        message: Messages.OTP_SENDED
    };
  }

  @Public()
  @Post('register')
  async registerMember(@Body() createMemberDto: CreateMemberDto) {
    await this.otpService.verifyOtpForEmail(createMemberDto.email, createMemberDto.otp);

    const birthDate = new Date(createMemberDto.birthDate);
    await this.usersService.registerMember(
      createMemberDto.email,
      createMemberDto.password,
      birthDate,
    );
    return {
        message: Messages.MEMBER_REGISTRED
    };
  }
}
