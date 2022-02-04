import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { WizardsService } from '../src/wizards/wizards.service';
import { ConfigService } from '@nestjs/config';

async function syncWizardsData() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const configService = app.get(ConfigService);
  const QUEUE_INTERVAL_CAP = configService.get<number>('QUEUE_INTERVAL_CAP');
  const QUEUE_INTERVAL = configService.get<number>('QUEUE_INTERVAL');

  if (!QUEUE_INTERVAL_CAP || !QUEUE_INTERVAL) {
    console.error(
      'QUEUE_INTERVAL_CAP or QUEUE_INTERVAL is not set in the .env file',
    );
    return;
  }

  console.log(
    `Φ Ψ λ ϐ ҩ Ӝ ⊙ ⚧ ⚭ Ω\n` +
      `It's the beginning of the semester at The Collegium Arcanum in Blue Wizard Bastion.\n` +
      `Wizards arrive at Platform 9 3/4 ready to depart.\n` +
      `(i.e. we're about to sync the wizard data to the database).\n` +
      `Each train will depart every ${
        QUEUE_INTERVAL / 1000
      } second(s) and contain ${QUEUE_INTERVAL_CAP} wizards.\n` +
      `It will take ~${
        Math.floor(9999 / QUEUE_INTERVAL_CAP) * (QUEUE_INTERVAL / 1000)
      } seconds to sync all wizards.`,
  );

  const wizardsService = app.get(WizardsService);
  await wizardsService.createMany(0, 9999);
}

syncWizardsData();
