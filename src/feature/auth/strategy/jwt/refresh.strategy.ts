import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
//import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: config.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
      issuer: config.get('JWT_ISSUER'),
      audience: config.get('JWT_AUDIENCE'),
    });
  }

  //   async validate(req: Request, payload: { sub: number; email: string }) {
  //     const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
  //     if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
  //     return {
  //       ...payload,
  //       refreshToken,
  //     };
  //   }
}
