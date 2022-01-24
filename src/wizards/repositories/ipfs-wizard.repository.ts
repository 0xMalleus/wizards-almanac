import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { Wizard } from '../entities/wizard.entity';
import { WizardTrait } from '../entities/trait.entity';
import { WizardMap } from '../mappers/wizard.map';

const IPFS_WIZARD_ENDPOINT =
  'https://cloudflare-ipfs.com/ipfs/QmfUgAKioFE8taS41a2XEjYFrkbfpVyXYRt7c6iqTZVy9G/';

const IPFS_WIZARD_IMAGE_ENDPOINT =
  'https://cloudflare-ipfs.com/ipfs/QmbtiPZfgUzHd79T1aPcL9yZnhGFmzwar7h4vmfV6rV8Kq/';

interface IRawWizard {
  name: string;
  image: string;
  attributes: IRawTrait[];
  background_color: string;
}

interface IRawTrait {
  trait_type: string;
  value: string | number;
}

@Injectable()
export class IpfsWizardRepository {
  constructor(private readonly wizardMap: WizardMap) {}

  async getWizardById(id: number): Promise<Wizard> {
    console.log(`Asking IPFS for wizard id ${id}...`);

    try {
      const response = await axios.get<IRawWizard>(
        `${IPFS_WIZARD_ENDPOINT}${id}`,
      );

      const rawWizard: IRawWizard = await response.data;

      return this.fromIpfsToDomain(rawWizard);
    } catch (error) {
      const { message } = error;

      console.log(`Error while trying to fetch wizard ${id}:`, {
        message,
      });

      throw error;
    }
  }

  private fromIpfsToDomain(rawWizard: IRawWizard): Wizard {
    const id = rawWizard.attributes.find(
      (t) => t.trait_type === 'Serial',
    )?.value;

    if (!id) {
      throw new Error(
        'Wizard did not have a Serial attribute. This should be impossible.',
      );
    }

    const wizard = {
      id: Number(id),
      name: rawWizard.name,
      image: this.fromIdToImageUri(id),
      backgroundColor: rawWizard.background_color,
      traits: rawWizard.attributes.map((t) => this.formatTrait(t)),
    };

    return this.wizardMap.toDomain(wizard);
  }

  private formatTrait(rawTrait: IRawTrait) {
    return {
      type: rawTrait.trait_type.toLowerCase(),
      value: rawTrait.value.toString(),
    };
  }

  private fromIdToImageUri(id: any): string {
    return `${IPFS_WIZARD_IMAGE_ENDPOINT}${id}.png`;
  }
}
