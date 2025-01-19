import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CmsController } from './controllers/cms.controller';
import { MembersController } from './controllers/members.controller';
import { AuthorsController } from './controllers/authors.controller';
import { UsersService } from './services/users.service';
import { RoleService } from './services/role.service';
import { OtpService } from './services/otp.service';
import { CmsUser, CmsUserSchema } from './schemas/cms-user.schema';
import { Member, MemberSchema } from './schemas/member.schema';
import { Author, AuthorSchema } from './schemas/author.schema';
import { Role, RoleSchema } from './schemas/role.schema';
import { Otp, OtpSchema } from './schemas/otp.schema';
import { EmailService } from 'src/global/services/email.service';
import { PermissionsGuard } from 'src/global/guard/permissions.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CmsUser.name, schema: CmsUserSchema },
      { name: Member.name, schema: MemberSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
   
  ],
  controllers: [CmsController, MembersController, AuthorsController],
  providers: [UsersService, RoleService, OtpService, PermissionsGuard,EmailService],
  exports: [UsersService, RoleService, OtpService,EmailService],
})
export class UsersModule {}
