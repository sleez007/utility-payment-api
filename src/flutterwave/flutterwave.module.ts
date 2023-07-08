import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WaveService } from './wave.service';

@Global()
@Module({
  providers: [WaveService],
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'https://api.flutterwave.com/v3',
        headers: {
          'Content-Type': 'application/json',
          Authorization: configService.get('FLUTTER_WAVE_SK'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [WaveService],
})
export class FlutterwaveModule {}
