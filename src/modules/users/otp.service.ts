import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generate } from 'otp-generator';
import { Otp, OtpDocument } from './schemas/otp.schema';
import { ErrorMessages } from 'src/global/errors/errors';
import { EmailService } from 'src/global/services/email.service';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private readonly otpModel: Model<OtpDocument>,
    private readonly emailService: EmailService,) {}

  async createOtpForMember(email: string): Promise<void> {
    const otp = generate(6, { digits: true, specialChars: false });
    await this.otpModel.deleteMany({ email });
    const newOtp = new this.otpModel({ email, otp });
    await newOtp.save();

    await this.emailService.sendOtpEmail(email, otp);
  }

  async verifyOtpForEmail(email: string, enteredOtp: string): Promise<void> {
    const otpRecord = await this.otpModel.findOne({ email, otp: enteredOtp });
    if (!otpRecord) {
      throw new UnauthorizedException(ErrorMessages.INVALID_OTP);
    }
    await this.otpModel.deleteOne({ _id: otpRecord._id });
  }

  // async generatePinCodeForAuthor(email: string): Promise<string> {
  //   const pinCode = generate(6, {
  //     digits: true,
  //     lowerCaseAlphabets: false,
  //     upperCaseAlphabets: false,
  //     specialChars: false,
  //   });
  
  //   await this.otpModel.updateOne(
  //     { email },
  //     { otp: pinCode },
  //     { upsert: true },
  //   );
  
  //   await this.emailService.sendAuthorPinEmail(email, pinCode);
  
  //   return pinCode;
  // }
  
}
