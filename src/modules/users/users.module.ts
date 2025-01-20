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
import { PermissionsGuard } from 'src/global/guard/permissions.guard';
import { RolesController } from './controllers/roles.controller';
//import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CmsUser.name, schema: CmsUserSchema },
      { name: Member.name, schema: MemberSchema },
      { name: Author.name, schema: AuthorSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Otp.name, schema: OtpSchema },

    ]),
   //BooksModule,
  ],
  controllers: [
    CmsController,
    MembersController,
    AuthorsController,
    RolesController,
  ],
  providers: [
    UsersService,
    RoleService,
    OtpService,
    PermissionsGuard,
  ],
  exports: [
    UsersService,
    RoleService,
    OtpService,
  ],
})
export class UsersModule {}
