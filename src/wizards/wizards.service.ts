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
    const rawWizard = {
      id: 2633,
      name: 'Illusionist Aleister of the Hall',
      image:
        'https://cloudflare-ipfs.com/ipfs/QmbtiPZfgUzHd79T1aPcL9yZnhGFmzwar7h4vmfV6rV8Kq/2633.png',
      traits: [
        { type: 'serial', value: '2633' },
        { type: 'background', value: 'Black' },
        { type: 'body', value: 'Aristocrat Blue' },
        { type: 'head', value: 'Professor' },
        { type: 'prop', value: "Isaac's Apple" },
        { type: 'familiar', value: 'Great Owl' },
        { type: 'rune', value: 'Rune of Uranus' },
      ],
      backgroundColor: '000000',
    };

    return 'This creates a wizard';
  }

  findMany(QueryWizardsDto: QueryWizardsDto) {
    return 'This finds many wizards';
  }

  async findOne(id: number): Promise<Wizard> {
    return this.ipfsWizardRepository.getWizardById(id);
  }

  // private async addToPersistentStorage(wizard: Wizard) {
  //   return WizardMap.toDomain(
  //     this.wizardRepository.upsertWizardById(wizard.id, wizard),
  //   );
  // }
}
