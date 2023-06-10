import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @ApiProperty({ example: 'kingsley.etoka@innovatespace.co' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'Aa12345@' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class CreateAccountDTO {
  @ApiProperty({ example: 'kingsley.etoka@innovatespace.co' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'kingsley' })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'etoka' })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'Aa12345@' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
