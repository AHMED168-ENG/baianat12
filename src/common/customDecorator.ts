import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
export const UserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const excution = GqlExecutionContext.create(ctx);
    const req = excution.getContext().req;
    const tocken = req.headers.authorization.split(' ')[1];
    const userData = jwt.verify(tocken, process.env.SECRET_NAME);
    return data ? userData[data] : userData;
  },
);
