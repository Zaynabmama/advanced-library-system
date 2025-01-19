import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { OtpService } from '../services/otp.service';
import { Messages } from 'src/global/message';
import { PermissionsGuard } from 'src/global/guard/permissions.guard';
import { Permissions } from 'src/global/decorators/permissions.decorator';
import { CreateAuthorDto } from '../dto/create-author.dto';

@Controller('authors')
@UseGuards(PermissionsGuard)
export class AuthorsController {
  constructor(
    private readonly usersService: UsersService,
    
  ) {}


@Post('add')
@Permissions('add_author') 
async addAuthor(@Body() createAuthorDto: CreateAuthorDto) {
  const author = await this.usersService.addAuthor(createAuthorDto);

  return {
    message: Messages.AUTHOR_CREATED,
    author: {
      id: author._id,
      email: author.email,
      name: author.name,
    },
  };
}



  @Post('regenerate-pin')
  @Permissions('regenerate_author_pin') 
  async regeneratePin(@Body('email') email: string) {
    const pinCode = await this.usersService.generatePinCodeForAuthor(email);
    return {
      message: Messages.PIN_GENERATED,
    };
  }
}
