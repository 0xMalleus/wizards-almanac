import { IsEnum, IsString } from 'class-validator';

export enum WizardTraitType {
  Background = 'background',
  Body = 'body',
  Familiar = 'familiar',
  Head = 'head',
  Prop = 'prop',
  Rune = 'rune',
}

export const WIZARD_TRAIT_TYPES: string[] = Object.values(WizardTraitType);
