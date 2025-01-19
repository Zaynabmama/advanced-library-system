import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('Entering PermissionsGuard');

    const requiredPermissions = this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler());
    this.logger.debug(`Required Permissions: ${requiredPermissions || 'None'}`);

    if (!requiredPermissions) {
      this.logger.debug('No permissions required for this route');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    this.logger.debug(`Authenticated User: ${JSON.stringify(user)}`);
    this.logger.debug(`User Type: ${user.userType}`);

    if (user.userType?.toLowerCase() !== 'cms') {
      this.logger.warn('Access denied: User is not a CMS user');
      return false;
    }

    if (user.permissions?.includes('*')) {
      this.logger.debug('User has full access');
      return true;
    }

    const hasPermissions = requiredPermissions.every((permission) => user.permissions?.includes(permission));

    if (!hasPermissions) {
      this.logger.warn(`Access denied: Missing required permissions: ${requiredPermissions}`);
    }

    return hasPermissions;
  }
}
