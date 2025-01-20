import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { generate } from 'otp-generator';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserType } from 'src/global/enums';
import { Author } from '../schemas/author.schema';
import { CmsUser } from '../schemas/cms-user.schema';
import { Member } from '../schemas/member.schema';
import { Role } from '../schemas/role.schema';
import { EmailService } from 'src/global/services/email.service';
import { ErrorMessages } from 'src/global/errors/errors';
import { UploadService } from 'src/global/services/upload.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<Member>,
    @InjectModel(Author.name) private authorModel: Model<Author>,
    @InjectModel(CmsUser.name) private cmsUserModel: Model<CmsUser>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    private readonly emailService: EmailService,
    private readonly uploadService: UploadService,
  ) {}

  async validateCredentials(email: string, passwordOrPin: string) {
    const member = await this.memberModel
      .findOne({ email })
      .select('+password');
    //console.log('Member:', member);
    if (member && (await bcrypt.compare(passwordOrPin, member.password))) {
      //console.log('Password Matched');
      return member;
    }

    const author = await this.authorModel.findOne({ email }).select('+pinCode');
    //console.log('Author:', author);
    if (author && (await bcrypt.compare(passwordOrPin, author.pinCode))) {
      console.log(' Author Pin Code Matched');
      return author;
    }

    throw new UnauthorizedException(ErrorMessages.UNAUTHORIZED);
  }

  async validateCmsCredentials(
    email: string,
    password: string,
  ): Promise<CmsUser & { _id: Types.ObjectId }> {
    const cmsUser = await this.cmsUserModel
      .findOne({ email })
      .select('+password');

    if (!cmsUser || !(await bcrypt.compare(password, cmsUser.password))) {
      throw new UnauthorizedException(ErrorMessages.UNAUTHORIZED);
    }

    return cmsUser as CmsUser ;
  }

  async registerMember(email: string, password: string, birthDate: Date) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = new this.memberModel({
      email,
      password: hashedPassword,
      birthDate,
    });

    return newMember.save();
  }

  async generatePinCodeForAuthor(email: string): Promise<string> {
    const pinCode = generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const hashedPinCode = await bcrypt.hash(pinCode, 10);

    const author = await this.authorModel.findOne({ email });

    author.pinCode = hashedPinCode;
    await author.save();

    await this.emailService.sendAuthorPinEmail(email, pinCode);

    return pinCode;
  }

  async getCmsUserById(userId: string): Promise<CmsUser & { role: Role }> {
    const cmsUsers = await this.cmsUserModel.aggregate([
      { $match: { _id: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'roles',
          localField: 'roleId',
          foreignField: '_id',
          as: 'role',
        },
      },
      { $unwind: { path: '$role', preserveNullAndEmptyArrays: true } },
    ]);

    return cmsUsers[0];
  }
  // async getAllCmsUsersWithRoles(page: number, limit: number) {}

  async addAuthor(data: {
    email: string;
    name: { en: string; ar: string };
    biography: { en: string; ar: string };
    profileImage?: Express.Multer.File; 
  }): Promise<Author> {
    let profileImageUrl = '';
  
    if (data.profileImage) {
      profileImageUrl = this.uploadService.uploadImage(data.profileImage);
    }
    const author = new this.authorModel({
      ...data,
      profileImageUrl, 
    });

    await author.save();

    await this.generatePinCodeForAuthor(author.email);

    return author;
  }

  async addCmsUser(data: { fullName: string; email: string; roleId: string }) {
    const password = this.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const cmsUser = new this.cmsUserModel({
      ...data,
      password: hashedPassword,
      userType: UserType.CMS,
    });

    await cmsUser.save();
    return password;
  }

  async assignRoleToCmsUser(userId: string, roleId: any) {
    const cmsUser = await this.cmsUserModel.findById(userId);

    const role = await this.roleModel.findById(roleId);
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    cmsUser.roleId = roleId;
    await cmsUser.save();
  }

  private generateRandomPassword() {
    return Math.random().toString(36).slice(-8);
  }

  
}