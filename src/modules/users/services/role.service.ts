import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../schemas/role.schema';
import { CreateRoleDto } from '../dto/create-role.dto';
import { PaginatedDto } from 'src/global/dto/pagination.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

 
  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new this.roleModel(createRoleDto);
    return role.save();
  }


  async updateRolePermissions(roleId: string, permissions: string[]): Promise<Role> {
    const role = await this.roleModel.findById(roleId);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    role.permissions = permissions;
    return role.save();
  }

  async getAllRoles(page = 1, limit = 10): Promise<{ data: Role[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.roleModel.find().skip(skip).limit(limit).exec(),
      this.roleModel.countDocuments().exec(),
    ]);

    return { data, total };
  }

 
  async getRoleById(roleId: string): Promise<Role> {
    const role = await this.roleModel.findById(roleId);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  
}
