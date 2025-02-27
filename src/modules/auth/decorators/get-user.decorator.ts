import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../interfaces';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request['user'] as User;
    return user;
  },
);
