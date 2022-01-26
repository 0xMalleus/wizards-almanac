import { Injectable } from '@nestjs/common';
import { CreateWizardDto } from './dto/create-wizard.dto';
import { UpdateWizardDto } from './dto/update-wizard.dto';
import { Wizard } from './entities/wizard.entity';
import { WizardMap } from './mappers/wizard.map';
import { IpfsWizardRepository } from './repositories/ipfs-wizard.repository';
import { PrismaWizardRepository } from './repositories/prisma-wizard.repository';

@Injectable()
export class WizardsService {
  constructor(
    private readonly ipfsWizardRepository: IpfsWizardRepository,
    private readonly wizardRepository: PrismaWizardRepository,
  ) {}

  create(createWizardDto: CreateWizardDto) {
    return 'This action adds a new wizard';
  }

  findAll() {
    return `This action returns all wizards`;
  }

  async findOne(id: number): Promise<Wizard> {
    const wizardOrNull = await this.wizardRepository.getWizardById(id);

    if (!wizardOrNull) {
      const wizardFromIpfs = await this.ipfsWizardRepository.getWizardById(id);
      return this.addToPersistentStorage(wizardFromIpfs);
    }

    return WizardMap.toDomain(wizardOrNull);
  }

  private async addToPersistentStorage(wizard: Wizard) {
    return WizardMap.toDomain(
      this.wizardRepository.upsertWizardById(wizard.id, wizard),
    );
  }
}
