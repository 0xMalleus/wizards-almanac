import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WizardsModule } from './wizards/wizards.module';

@Module({
  imports: [PrismaModule, WizardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
