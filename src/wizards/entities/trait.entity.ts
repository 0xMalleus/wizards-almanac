import { IsEnum, IsString } from 'class-validator';

export enum WizardTraitType {
  Serial = 'serial',
  Background = 'background',
  Body = 'body',
  Head = 'head',
  Prop = 'prop',
  familiar = 'familiar',
  rune = 'rune',
}

export const WIZARD_TRAIT_TYPES: string[] = Object.values(WizardTraitType);

export class WizardTrait {
  @IsEnum(WIZARD_TRAIT_TYPES)
  type: WizardTraitType;
  @IsString()
  value: string;
}
