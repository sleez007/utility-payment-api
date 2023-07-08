import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO, CreateAccountDTO } from './dto/auth.dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { EmailService } from 'src/aws/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async findUser(dto: AuthDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new UnauthorizedException('Email Address does not exist');
    const hashedPassword = user.password;
    const doesPasswordMatch = await argon.verify(hashedPassword, dto.password);
    if (!doesPasswordMatch)
      throw new UnauthorizedException('Password is incorrect');
    delete user.password;
    return user;
  }

  async login(user: User, ipAddress: string) {
    delete user.password;
    return {
      ...user,
      ipAddress,
      token: this.jwtService.sign(
        {
          email: user.email,
          sub: user.id,
        },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn: '2h',
        },
      ),
    };
  }

  async createNewAccount(dto: CreateAccountDTO) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user)
      throw new UnauthorizedException('Account with email already exists');

    const hashPassword = await argon.hash(dto.password);

    user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashPassword,
        email: dto.email,
      },
    });
    await this.emailService.sendWelcomeEmail(
      dto.email,
      'Welcome baby',
      dto.firstName,
    );
    return {
      message: 'Your account has been created successfully',
      id: user.id,
    };
  }

  async retrievAllUsers() {
    return await this.prisma.user.findMany();
  }
}
