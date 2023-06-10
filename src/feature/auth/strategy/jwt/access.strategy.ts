import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessJWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreException: false,
      secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
      issuer: config.get('JWT_ISSUER'),
      audience: config.get('JWT_AUDIENCE'),
    });
  }

  // async validate(payload: { sub: number; email: string }):Promise<any> {
  //     const user = await this.prisma.user.findUnique({
  //       where: { id: payload.sub },
  //     });
  //     return user != null ? { ...user, password: null } : null;
  // }
}
