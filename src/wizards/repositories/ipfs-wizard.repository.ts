import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Wizard } from '../entities/wizard.entity';

const IPFS_WIZARD_GATEWAY =
  'https://cloudflare-ipfs.com/ipfs/QmfUgAKioFE8taS41a2XEjYFrkbfpVyXYRt7c6iqTZVy9G/';

interface IIpfsWizard {
  name: string;
  image: string;
  attributes: IIpfsTrait[];
  background_color: string;
}

interface IIpfsTrait {
  trait_type: string;
  value: string;
}

@Injectable()
export class IpfsWizardRepository {
  async getWizardById(id: number): Promise<Wizard> {
    console.log(`Getting wizard with id: ${id}...`);
    const response = await axios.get<IIpfsWizard>(
      `${IPFS_WIZARD_GATEWAY}${id}`,
    );

    const ipfsWizard: IIpfsWizard = response.data;

    return this.mapIpfsWizardToWizard(id, ipfsWizard);
  }

  private mapIpfsWizardToWizard(id: number, ipfsWizard: IIpfsWizard): Wizard {
    return {
      id: id,
      name: ipfsWizard.name,
      image: ipfsWizard.image,
      backgroundColor: ipfsWizard.background_color,
      traits: ipfsWizard.attributes.map((ipfsTrait: IIpfsTrait) => ({
        type: ipfsTrait.trait_type,
        value: ipfsTrait.value,
      })),
    };
  }
}
