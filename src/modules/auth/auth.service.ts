import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'src/global/jwt-payload';
import { UserType } from 'src/global/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(email: string, passwordOrPin: string) {
    const user = await this.usersService.validateCredentials(
      email,
      passwordOrPin,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      _id: user._id,
      email: user.email,
      userType: user.userType,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async cmsLogin(email: string, password: string) {
    const cmsUser = await this.usersService.validateCmsCredentials(
      email,
      password,
    );

    const cmsUserWithRole = await this.usersService.getCmsUserById(
      cmsUser._id.toString(),
    );

    const payload: JwtPayload = {
      _id: cmsUserWithRole._id,
      email: cmsUserWithRole.email,
      userType: UserType.CMS,
      permissions: cmsUserWithRole.role?.permissions || [],
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

//   async getProfile(memberId: string) {
//     const member = await this.usersService.getMemberById(memberId);
//     const borrowHistory = await this.borrowHistoryService.getBorrowHistoryForMember(
//       memberId,
//     );
//     return {
//       member: {
//         _id: member._id,
//         email: member.email,
//         returnRate: member.returnRate,
//       },
//       borrowHistory,
//     };
//   }
// 
}
