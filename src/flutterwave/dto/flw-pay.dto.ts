import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FlwPayDto {
  @ApiProperty({ example: 'NG' })
  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @ApiProperty({ example: '45076535413' })
  @IsNotEmpty()
  @IsString()
  readonly customer: string;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty({ example: 'BIL115' })
  @IsNotEmpty()
  @IsString()
  readonly type: string;
}
