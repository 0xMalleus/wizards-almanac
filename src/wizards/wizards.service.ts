import { Injectable } from '@nestjs/common';
import { CreateWizardDto } from './dto/create-wizard.dto';
import { UpdateWizardDto } from './dto/update-wizard.dto';
import { IpfsWizardRepository } from './repositories/ipfs-wizard.repository';

@Injectable()
export class WizardsService {
  constructor(private readonly ipfsWizardRepository: IpfsWizardRepository) {}

  create(createWizardDto: CreateWizardDto) {
    return 'This action adds a new wizard';
  }

  findAll() {
    return `This action returns all wizards`;
  }

  findOne(id: number) {
    return this.ipfsWizardRepository.getWizardById(id);
  }

  update(id: number, updateWizardDto: UpdateWizardDto) {
    return `This action updates a #${id} wizard`;
  }

  remove(id: number) {
    return `This action removes a #${id} wizard`;
  }
}
