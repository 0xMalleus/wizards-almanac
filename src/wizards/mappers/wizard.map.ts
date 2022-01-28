import { Injectable } from '@nestjs/common';
import { Wizard } from '../entities/wizard.entity';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { RawIpfsWizard } from '../repositories/ipfs-wizard.repository';
import { IPFS_WIZARD_IMAGE_ENDPOINT } from '../constants.wizards';
import { Background } from '../entities/background.entity';
import { Body } from '../entities/body.entity';
import { Head } from '../entities/head.entity';
import { Prop } from '../entities/prop.entity';
import { Familiar } from '../entities/familiar.entity';
import { Rune } from '../entities/rune.entity';

/**
 * We use a Map class to move from raw data into and out of our Domain object.
 *
 * This gives us a single boundary "crossing" where data is validated and can then
 * be treated as safe once inside the Domain.
 *
 * We use `class-validator` to check data requirements beyond just the type.
 **/
@Injectable()
export class WizardMap {
  public static toDomain(raw: any): Wizard {
    const background = plainToInstance(Background, {
      name: raw.background.name,
      hex: raw.background.hex,
    });
    const body = plainToInstance(Body, raw.body);
    const head = plainToInstance(Head, raw.head);
    const prop = plainToInstance(Prop, raw.prop);
    const familiar = plainToInstance(Familiar, raw.familiar);
    const rune = plainToInstance(Rune, raw.rune);

    const input = {
      id: raw.id,
      name: raw.name,
      image: raw.image,
      background,
      body,
      head,
      prop,
      familiar,
      rune,
    };

    const wizard = plainToInstance(Wizard, input);

    const validationResult = validateSync(wizard);

    if (validationResult.length > 0) {
      throw new Error(
        'Validation errors: ' + JSON.stringify(validationResult, null, 2),
      );
    }

    return wizard;
  }

  public static toDomainFromIpfs(raw: RawIpfsWizard): Wizard {
    const id = Number(
      raw.attributes.find((t) => t.trait_type === 'Serial')?.value,
    );

    const image = `${IPFS_WIZARD_IMAGE_ENDPOINT}${id}.png`;

    const background = {
      name:
        raw.attributes.find((t) => t.trait_type === 'background')?.value || '',
      hex: raw.background_color,
    };

    const body = {
      name:
        raw.attributes.find((t) => t.trait_type === 'body')?.value || 'None',
    };

    const head = {
      name:
        raw.attributes.find((t) => t.trait_type === 'head')?.value || 'None',
    };

    const prop = {
      name:
        raw.attributes.find((t) => t.trait_type === 'prop')?.value || 'None',
    };

    const familiar = {
      name:
        raw.attributes.find((t) => t.trait_type === 'familiar')?.value ||
        'None',
    };

    const rune = {
      name:
        raw.attributes.find((t) => t.trait_type === 'rune')?.value || 'None',
    };

    return WizardMap.toDomain({
      id,
      name: raw.name,
      image,
      background,
      body,
      head,
      prop,
      familiar,
      rune,
    });
  }
}
