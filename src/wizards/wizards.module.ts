import { Module } from '@nestjs/common';
import { WizardsService } from './wizards.service';
import { WizardsController } from './wizards.controller';
import { IpfsWizardRepository } from './repositories/ipfs-wizard.repository';
import { WizardMap } from './mappers/wizard.map';

@Module({
  controllers: [WizardsController],
  providers: [WizardsService, IpfsWizardRepository, WizardMap],
})
export class WizardsModule {}
