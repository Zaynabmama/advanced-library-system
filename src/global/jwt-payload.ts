import { Types } from "mongoose";
import { UserType } from "./enums";

export interface JwtPayload {
    _id: Types.ObjectId;
    email: string;
    userType: UserType;
    permissions?: string[];
  }