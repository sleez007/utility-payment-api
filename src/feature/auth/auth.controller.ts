import {
  Body,
  Controller,
  Get,
  HttpCode,
  Ip,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { GetUser, Public } from 'src/core/decorator';
import { AuthDTO, CreateAccountDTO } from './dto/auth.dto';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(AuthGuard('local'))
  //@ApiCreatedResponse({ type: AuthResponse })
  @ApiBody({ type: AuthDTO })
  @HttpCode(200)
  @Post('/login')
  login(@Ip() ipAddress: string, @GetUser() user: User) {
    return this.authService.login(user, ipAddress);
  }

  @Public()
  @Post('/create-account')
  @ApiBody({ type: CreateAccountDTO })
  createAccount(@Body() dto: CreateAccountDTO) {
    return this.authService.createNewAccount(dto);
  }

  @Public()
  @Post()
  @Get('/users')
  @ApiCreatedResponse({
    type: class IUser {
      firstName = '';
      lastName = '';
      email = '';
      password = '';
    },
    isArray: true,
  })
  retrieveUsers() {
    return this.authService.retrievAllUsers();
  }
}
