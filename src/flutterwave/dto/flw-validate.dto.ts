import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FlwValidateDto {
  @ApiProperty({ example: 'BIL115' })
  @IsNotEmpty()
  @IsString()
  readonly billerCode: string;

  @ApiProperty({ example: '45076535413' })
  @IsNotEmpty()
  @IsString()
  readonly customer: string;

  @ApiProperty({ example: 'UB163' })
  @IsNotEmpty()
  @IsString()
  readonly itemCode: string;
}
