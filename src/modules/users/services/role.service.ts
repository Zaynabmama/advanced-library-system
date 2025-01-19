import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessages } from 'src/global/errors/errors';
import { Role } from '../schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}


  async createRole(roleName: string, permissions: string[]): Promise<Role> {
    const role = new this.roleModel({ roleName, permissions });
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


  async getAllRoles(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }


  async getRoleById(roleId: string): Promise<Role> {
    const role = await this.roleModel.findById(roleId);
    if (!role) {
      throw new NotFoundException(ErrorMessages.ROLE_NOT_FOUND);
    }
    return role;
  }

  
  async deleteRole(roleId: string): Promise<void> {
    const result = await this.roleModel.deleteOne({ _id: roleId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(ErrorMessages.ROLE_NOT_FOUND);
    }
  }
}
