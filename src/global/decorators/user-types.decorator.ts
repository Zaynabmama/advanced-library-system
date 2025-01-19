import { SetMetadata } from '@nestjs/common';
import { UserType } from '../enums';

export const USER_TYPES_KEY = 'userTypes';
export const RequireUserTypes = (...userTypes: UserType[]) => 
  SetMetadata(USER_TYPES_KEY, userTypes);