import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * @param app An instance of the nest Application to enable us configure swagger and add a path to load up our docs
 */
export function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Utility Payment Backend Server')
    .setDescription('Backend Api Documentation For Pandora Utility API Server')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
        description: 'Enter JWT Access Token',
      },
      'access-token',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
        description: 'Enter JWT Refresh Token',
      },
      'refresh-token',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
        description: 'Enter JWT Temporary Token',
      },
      'temporary-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
