import { Types } from "mongoose";

export class CmsUserWithRoleDto {
    _id: Types.ObjectId;
    email: string;
    fullName: string;
    role?: {
      _id: Types.ObjectId;
      name: string;
      permissions: string[];
    };
  }
  