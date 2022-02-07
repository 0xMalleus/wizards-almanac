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
    .setDescription(
      'An Open Source (Proof of Concept) API for [Forgotten Runes](https://www.forgottenrunes.com). <br><br>Brought to you by [Headmaster Aleister](https://www.forgottenrunes.com/lore/wizards/2633/0) aka [Malleus](https://twitter.com/0xMalleus).<br><br>Code available on [GitHub](https://github.com/0xMalleus/wizards-almanac).',
    )
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocOptions);

  SwaggerModule.setup('docs', app, swaggerDocument, {
    customSiteTitle: "Wizards' Almanac",
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
