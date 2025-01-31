import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Permissions } from 'src/global/decorators/permissions.decorator';
import { PermissionsGuard } from 'src/global/guard/permissions.guard';
import { UsersService } from '../services/users.service';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { CreateCmsUserDto } from '../dto/create-cms-user.dto';
import { EmailService } from 'src/global/services/email.service';
import { PermissionsEnum } from 'src/global/enums';
import { Messages } from 'src/global/message';
import { PaginatedDto } from 'src/global/dto/pagination.dto';

@Controller('cms')
@UseGuards(PermissionsGuard) 
export class CmsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Post('add-user')
  @Permissions(PermissionsEnum.CREATE_CMS_USER) 
  async addCmsUser(@Body() createCmsUserDto: CreateCmsUserDto) {
    const password = await this.usersService.addCmsUser(createCmsUserDto);
    await this.emailService.sendCmsPasswordEmail(createCmsUserDto.email, password);
    return { message: Messages.CMS_CREATED};
  }

  @Post('assign-role')
  @Permissions(PermissionsEnum.ASSIGN_ROLES)
  async assignRoleToCmsUser(@Body() assignRoleDto: AssignRoleDto) {
    await this.usersService.assignRoleToCmsUser(assignRoleDto.userId, assignRoleDto.roleId);
    return { message: Messages.ROLE_ASSIGNED };
  }

  //@Get()
 // @Permissions(PermissionsEnum.PAGINATE_CMS_USERS)
  // async getAllCmsUsers(@Query() paginationDto: PaginatedDto) {
  //   const users = await this.usersService.getAllCmsUsersWithRoles(paginationDto.page, paginationDto.limit);
  //   return { users };
  // }

  @Get(':id')
  @Permissions(PermissionsEnum.PAGINATE_CMS_USERS)
  async getCmsUserById(@Param('id') id: string) {
    const user = await this.usersService.getCmsUserById(id);
    return {user };
  }

  @Put(':id/role')
  @Permissions(PermissionsEnum.ASSIGN_ROLES)
  async updateCmsUserRole(@Param('id') userId: string, @Body() assignRoleDto: AssignRoleDto) {
    await this.usersService.assignRoleToCmsUser(userId, assignRoleDto.roleId);
    return { message: Messages.ROLE_UPDATED };
  }

}

