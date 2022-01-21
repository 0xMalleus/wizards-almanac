import { PartialType } from '@nestjs/mapped-types';
import { CreateWizardDto } from './create-wizard.dto';

export class UpdateWizardDto extends PartialType(CreateWizardDto) {}
