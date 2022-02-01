import { Injectable, Logger } from '@nestjs/common';
import { UpsertWizardDto as UpsertWizardDto } from './dto/upsert-wizard.dto';
import { QueryWizardsDto } from './dto/query-wizards.dto';
import { Wizard } from './entities/wizard.entity';
import { WizardMap } from './mappers/wizard.map';
import { IpfsWizardRepository } from './repositories/ipfs-wizard.repository';
import { PrismaWizardRepository } from './repositories/prisma-wizard.repository';
import { QueueService } from '../common/queue/queue.service';

@Injectable()
export class WizardsService {
  constructor(
    private readonly ipfsWizardRepository: IpfsWizardRepository,
    private readonly wizardRepository: PrismaWizardRepository,
    private readonly queueService: QueueService,
  ) {}

  findMany(QueryWizardsDto: QueryWizardsDto) {
    return 'This finds many wizards';
  }

  findOne(id: number) {
    return this.wizardRepository.getWizardById(id);
  }

  upsert(upsertWizardDto: UpsertWizardDto) {
    Logger.log(`Creating wizard ${upsertWizardDto.name}`);
    const wizard = WizardMap.toDomain(upsertWizardDto);

    return this.upsertToPersistentStorage(wizard);
  }

  async createMany(startId: number, endId: number) {
    const wizardsQueue = this.queueService.getQueue('wizards');

    Logger.log(
      `Wizards ${startId} - ${endId} have arrived at Platform 9 3/4 (i.e. will be queued for upsert).`,
    );

    for (let i = startId; i <= endId; i++) {
      wizardsQueue.add(async () => {
        try {
          const wizard = await this.ipfsWizardRepository.getWizardById(i);
          await this.upsertToPersistentStorage(wizard);

          Logger.log(
            `Wizard ${i}, ${wizard.name}, has arrived at Blue Wizard Bastion (i.e. upserted into database).`,
          );
        } catch (error) {
          Logger.error(`Wizard ${i} didn't make it.`);
          Logger.error(error);
        }
      });
    }
  }

  private async upsertToPersistentStorage(wizard: Wizard) {
    this.wizardRepository.upsertWizardById(wizard.id, wizard);
  }
}
