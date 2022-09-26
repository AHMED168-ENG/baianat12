import { SetMetadata } from '@nestjs/common';
import { Roles } from './Roles';

export const ROLES_KEY = 'roles';
export const SetRoles = (...roles: Roles[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
