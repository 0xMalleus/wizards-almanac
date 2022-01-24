import { Injectable } from '@nestjs/common';
import { Wizard } from '../entities/wizard.entity';
import { WizardTrait } from '../entities/trait.entity';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, validateSync } from 'class-validator';

@Injectable()
export class WizardMap {
  public toDomain(raw: any) {
    const wizard = plainToInstance(Wizard, raw);

    const validationResult = validateSync(wizard);

    if (validationResult.length > 0) {
      throw new Error(JSON.stringify(validationResult));
    }

    return wizard;
  }
}
