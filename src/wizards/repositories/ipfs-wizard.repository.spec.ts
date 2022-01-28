import { TestingModule, Test } from '@nestjs/testing';
import { MockProxy } from 'jest-mock-extended';
import { IpfsWizardRepository } from './ipfs-wizard.repository';
import { WizardMap } from '../mappers/wizard.map';
import { Wizard } from '../entities/wizard.entity';

import axios from 'axios';
jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('IpfsWizardRepository', () => {
  let repository: IpfsWizardRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IpfsWizardRepository],
    }).compile();

    repository = module.get<IpfsWizardRepository>(IpfsWizardRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findWizardById()', () => {
    describe('when IPFS returns a valid wizard...', () => {
      beforeEach(() => {
        axiosMock.get.mockResolvedValue({
          data: {
            name: 'Old Scratch',
            image:
              'ipfs://QmbtiPZfgUzHd79T1aPcL9yZnhGFmzwar7h4vmfV6rV8Kq/666.png',
            attributes: [
              {
                trait_type: 'Serial',
                display_type: 'number',
                value: 666,
              },
              {
                trait_type: 'background',
                value: 'Red',
              },
              {
                trait_type: 'body',
                value: 'Red Suit',
              },
              {
                trait_type: 'head',
                value: 'Evil One',
              },
              {
                trait_type: 'prop',
                value: "Wizard's Pipe",
              },
              {
                trait_type: 'familiar',
                value: 'Forever Bat',
              },
              {
                trait_type: 'rune',
                value: 'Rune of Brimstone',
              },
            ],
            background_color: '1E0200',
          },
        });
      });

      it('should return a wizard', async () => {
        const wizard = await repository.getWizardById(666);

        expect(wizard).toBeInstanceOf(Wizard);
      });
    });

    describe('when IPFS does not find a wizard...', () => {
      beforeEach(() => {
        const requestError = new Error(
          'ipfs resolve -r /ipfs/QmfUgAKioFE8taS41a2XEjYFrkbfpVyXYRt7c6iqTZVy9G/20000: no link named "20000" under QmfUgAKioFE8taS41a2XEjYFrkbfpVyXYRt7c6iqTZVy9G',
        );

        axiosMock.get.mockRejectedValue(requestError);
      });

      it('should throw an error', async () => {
        await expect(repository.getWizardById(20000)).rejects.toThrow();
      });
    });
  });
});
