import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Roles } from 'src/common/Roles';
import { ROLES_KEY } from 'src/common/customFunctionDecorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    let tocken = req.headers.authorization.split(' ')[1];
    let { id, roles }: any = jwt.verify(tocken, process.env.SECRET_NAME);
    if (!requiredRoles.some((ele) => roles.includes(ele))) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
