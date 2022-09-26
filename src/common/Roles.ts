import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  Admin = 'admin',
  User = 'user',
}

registerEnumType(Roles, {
  name: 'Roles',
});
