import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { OtpService } from '../services/otp.service';
import { Messages } from 'src/global/message';
import { PermissionsGuard } from 'src/global/guard/permissions.guard';
import { Permissions } from 'src/global/decorators/permissions.decorator';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PermissionsEnum } from 'src/global/enums';

@Controller('authors')
@UseGuards(PermissionsGuard)
export class AuthorsController {
  constructor(
    private readonly usersService: UsersService,
    
  ) {}


@Post('add')
@Permissions(PermissionsEnum.ADD_AUTHOR)
@UseInterceptors(FileInterceptor('profileImage'))
async addAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() profileImage?: Express.Multer.File, 
) {

  const author = await this.usersService.addAuthor({
    ...createAuthorDto,
    profileImage,
  });

  return {
    message: Messages.AUTHOR_CREATED,
    author: {
      id: author._id,
      email: author.email,
      name: author.name,
      profileImageUrl: author.profileImageUrl,
    },
  };
}



  @Post('regenerate-pin')
  // @Permissions('regenerate_author_pin')
  @Permissions(PermissionsEnum.REGENERATE_AUTHOR_PIN) 
  async regeneratePin(@Body('email') email: string) {
    const pinCode = await this.usersService.generatePinCodeForAuthor(email);
    return {
      message: Messages.PIN_GENERATED,
    };
  }
}
