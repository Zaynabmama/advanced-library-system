import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { Permissions } from 'src/global/decorators/permissions.decorator';
import { PermissionsEnum } from 'src/global/enums';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Messages } from 'src/global/message';
import { PermissionsGuard } from 'src/global/guard/permissions.guard';
import { PaginatedDto } from 'src/global/dto/pagination.dto';

@Controller('roles')
@UseGuards(PermissionsGuard)
export class RolesController {
  constructor(private readonly roleService: RoleService) {}


  @Post()
  @Permissions(PermissionsEnum.CREATE_ROLE)
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.roleService.createRole(createRoleDto);
    return { message: Messages.ROLE_CREATED, role };
  }


  @Get()
  @Permissions(PermissionsEnum.PAGINATE_CMS_USERS)
  async getAllRoles(@Query() paginationDto: PaginatedDto) {
    const { page, limit } = paginationDto;
    const { data, total } = await this.roleService.getAllRoles(page, limit);
    return { message: Messages.ROLES_FETCHED, data, total };
  }


  @Put(':id')
  @Permissions(PermissionsEnum.ASSIGN_ROLES)
  async updateRolePermissions(
    @Param('id') roleId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const updatedRole = await this.roleService.updateRolePermissions(roleId, updateRoleDto.permissions);
    return { message: Messages.ROLE_UPDATED, updatedRole };
  }


  @Get(':id')
  @Permissions(PermissionsEnum.PAGINATE_CMS_USERS)
  async getRoleById(@Param('id') roleId: string) {
    const role = await this.roleService.getRoleById(roleId);
    return { message: Messages.ROLE_FETCHED, role };
  }
}
