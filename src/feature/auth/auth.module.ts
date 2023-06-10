import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessJWTStrategy, RefreshJwtStrategy } from './strategy/jwt';
import { LocalStrategy } from './strategy/local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, JwtModule.register({})],
  providers: [
    AccessJWTStrategy,
    RefreshJwtStrategy,
    LocalStrategy,
    AuthService,
  ],
})
export class AuthModule {}
