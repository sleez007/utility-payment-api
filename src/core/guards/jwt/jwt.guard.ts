import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 *  This GUARD RUNS THE JWT STRATEGY TO ENSURE THAT A VALID TOKEN IS PROVIDED FOR PROTECTED ENDPOINTS
 *  THIS GUARD WILL CHECK TO KNOW IF THE RESOURCEE ENDPOINT IS A PUBLIC ENDPOINT BEFORE RUNNING OUR STRATEGY
 */

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
