import { Module } from '@nestjs/common';
import { WizardsService } from './wizards.service';
import { WizardsController } from './wizards.controller';
import { IpfsWizardRepository } from './repositories/ipfs-wizard.repository';
import { WizardMap } from './mappers/wizard.map';
import { PrismaWizardRepository } from './repositories/prisma-wizard.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [WizardsController],
  providers: [
    WizardsService,
    WizardMap,
    IpfsWizardRepository,
    PrismaWizardRepository,
  ],
})
export class WizardsModule {}
