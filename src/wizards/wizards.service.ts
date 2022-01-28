import { Injectable } from '@nestjs/common';
import { CreateWizardDto } from './dto/create-wizard.dto';
import { UpdateWizardDto } from './dto/update-wizard.dto';
import { QueryWizardsDto } from './dto/query-wizards.dto';
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
    const validRawWizard = {
      id: 2633,
      name: 'Illusionist Aleister of the Hall',
      image:
        'https://cloudflare-ipfs.com/ipfs/QmfUgAKioFE8taS41a2XEjYFrkbfpVyXYRt7c6iqTZVy9G/2633',
      background: {
        hex: '000000',
        name: 'Black',
      },
      body: {
        name: 'Aristocrat Blue',
      },
      head: {
        name: 'Professor',
      },
      prop: {
        name: "Isaac's Apple",
      },
      familiar: {
        name: 'Great Owl',
      },
      rune: {
        name: 'Rune of Uranus',
      },
    };
    const wizard = WizardMap.toDomain(validRawWizard);

    return this.addToPersistentStorage(wizard);
  }

  findMany(QueryWizardsDto: QueryWizardsDto) {
    return 'This finds many wizards';
  }

  async findOne(id: number) {
    const result = await this.wizardRepository.getWizardById(id);
    console.log(result);
    return result;
  }

  private async addToPersistentStorage(wizard: Wizard) {
    this.wizardRepository.upsertWizardById(wizard.id, wizard);
  }
}
