import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WizardsModule } from './wizards/wizards.module';
import { CommonModule } from './common/common.module';
import { validateConfig } from './env.validation';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateConfig,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    WizardsModule,
    CommonModule,
    PrismaModule,
  ],
})
export class AppModule {}
