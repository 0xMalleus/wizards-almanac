import { PartialType } from '@nestjs/mapped-types';
import { UpsertWizardDto } from './upsert-wizard.dto';

export class UpdateWizardDto extends PartialType(UpsertWizardDto) {}
