import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../../auth.service';
import { AuthDTO } from '../../dto/auth.dto';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    // Override the default passport username field key to use email instead since we are using email and password
    super({ usernameField: 'email', passReqToCallback: false });
  }

  async validate(email: string, password: string): Promise<any> {
    const dto: AuthDTO = {
      email,
      password,
    };
    const user = await this.authService.findUser(dto);
    return user;
  }
}
