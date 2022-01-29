import { Injectable, Logger } from '@nestjs/common';
import { CreateWizardDto } from './dto/create-wizard.dto';
import { UpdateWizardDto } from './dto/update-wizard.dto';
import { QueryWizardsDto } from './dto/query-wizards.dto';
import { Wizard } from './entities/wizard.entity';
import { WizardMap } from './mappers/wizard.map';
import { IpfsWizardRepository } from './repositories/ipfs-wizard.repository';
import { PrismaWizardRepository } from './repositories/prisma-wizard.repository';
import { QueueService } from 'src/common/queue/queue.service';

@Injectable()
export class WizardsService {
  constructor(
    private readonly ipfsWizardRepository: IpfsWizardRepository,
    private readonly wizardRepository: PrismaWizardRepository,
    private readonly queueService: QueueService,
  ) {}

  create(createWizardDto: CreateWizardDto) {
    Logger.log(`Creating wizard ${createWizardDto.name}`);
    const wizard = WizardMap.toDomain(createWizardDto);

    return this.addToPersistentStorage(wizard);
  }

  async createMany(startId: number, endId: number) {
    const wizardsQueue = this.queueService.getQueue('wizards');

    for (let i = startId; i <= endId; i++) {
      wizardsQueue.add(async () => {
        try {
          const wizard = await this.ipfsWizardRepository.getWizardById(i);
          this.addToPersistentStorage(wizard);
        } catch (error) {
          Logger.error(`Error adding wizard ${i} to persistent storage`);
          Logger.error(error);
        }
      });
    }
  }

  findMany(QueryWizardsDto: QueryWizardsDto) {
    return 'This finds many wizards';
  }

  findOne(id: number) {
    return this.wizardRepository.getWizardById(id);
  }

  private async addToPersistentStorage(wizard: Wizard) {
    this.wizardRepository.upsertWizardById(wizard.id, wizard);
  }
}
