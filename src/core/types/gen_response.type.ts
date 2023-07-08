import { ApiProperty } from '@nestjs/swagger';

export class GenResponse {
  @ApiProperty({
    example: 'A message describing the request outcome',
    type: String,
  })
  message: string;
}
