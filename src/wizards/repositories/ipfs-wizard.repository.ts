import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Wizard } from '../entities/wizard.entity';
import { WizardMap } from '../mappers/wizard.map';

const IPFS_WIZARD_ENDPOINT =
  'https://cloudflare-ipfs.com/ipfs/QmfUgAKioFE8taS41a2XEjYFrkbfpVyXYRt7c6iqTZVy9G/';

const IPFS_WIZARD_IMAGE_ENDPOINT =
  'https://cloudflare-ipfs.com/ipfs/QmbtiPZfgUzHd79T1aPcL9yZnhGFmzwar7h4vmfV6rV8Kq/';

export type RawIpfsWizard = {
  name: string;
  image: string;
  attributes: IpfsAttribute[];
  background_color: string;
};

type IpfsAttribute = {
  trait_type: string;
  value: string | number;
};

@Injectable()
export class IpfsWizardRepository {
  async getWizardById(id: number): Promise<Wizard> {
    Logger.debug(`Fetching wizard with id ${id} from IPFS`);

    try {
      const response = await axios.get<RawIpfsWizard>(
        `${IPFS_WIZARD_ENDPOINT}${id}`,
      );

      const rawWizard: RawIpfsWizard = await response.data;

      Logger.debug(`IPFS returned: ${JSON.stringify(rawWizard, null, 2)}`);

      return WizardMap.toDomainFromIpfs(rawWizard);
    } catch (error) {
      const { message } = error;

      Logger.debug(
        `Error while trying to fetch wizard ${id}:`,
        JSON.stringify(message, null, 2),
      );

      throw error;
    }
  }
}
