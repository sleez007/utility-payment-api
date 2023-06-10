import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @description A decorator function to retrieve the user object that is attached as part of every request
 * This is an abstraction that helps us avoid using the default @Req decorator which uses express under the hood
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request['user'][data];
    }
    return request['user'];
  },
);
