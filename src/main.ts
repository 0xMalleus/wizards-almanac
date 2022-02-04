import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['error', 'warn', 'log'],
  });

  const swaggerDocOptions = new DocumentBuilder()
    .setTitle(`Wizards' Almanac`)
    .setDescription('A (Proof of Concept) API for the Runiverse')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocOptions);

  SwaggerModule.setup('docs', app, swaggerDocument, {
    customSiteTitle: "Wizards' Almanac",
  });

  await app.listen(3000);
}

bootstrap();
