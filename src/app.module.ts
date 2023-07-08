import { Module } from '@nestjs/common';
import { AuthModule } from './feature/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PaymentModule } from './feature/payment/payment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JWTGuard } from './core/guards';
import { AwsModule } from './aws/aws.module';
import { FlutterwaveModule } from './flutterwave/flutterwave.module';
import { ProductsModule } from './feature/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    PaymentModule,
    AwsModule,
    FlutterwaveModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
    AwsModule,
    FlutterwaveModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JWTGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
