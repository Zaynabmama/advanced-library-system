import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/global/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/global/guard/permissions.guard';
import { UsersService } from '../services/users.service';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { CreateCmsUserDto } from '../dto/create-cms-user.dto';
import { EmailService } from 'src/global/services/email.service';

@Controller('cms')
@UseGuards(PermissionsGuard) 
export class CmsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Post('add-user')
  @Permissions('add_user') 
  async addCmsUser(@Body() createCmsUserDto: CreateCmsUserDto) {
    const password = await this.usersService.addCmsUser(createCmsUserDto);
    await this.emailService.sendCmsPasswordEmail(createCmsUserDto.email, password);
    return { message: 'CMS user added successfully, password sent via email.' };
  }

  @Post('assign-role')
  @Permissions('assign_roles')
  async assignRoleToCmsUser(@Body() assignRoleDto: AssignRoleDto) {
    await this.usersService.assignRoleToCmsUser(assignRoleDto.userId, assignRoleDto.roleId);
    return { message: 'Role assigned successfully.' };
  }
}
