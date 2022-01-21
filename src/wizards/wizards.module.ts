import { Module } from '@nestjs/common';
import { WizardsService } from './wizards.service';
import { WizardsController } from './wizards.controller';
import { IpfsWizardRepository } from './repositories/ipfs-wizard.repository';

@Module({
  controllers: [WizardsController],
  providers: [WizardsService, IpfsWizardRepository],
})
export class WizardsModule {}
