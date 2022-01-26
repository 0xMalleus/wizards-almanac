import { Test, TestingModule } from '@nestjs/testing';
import { WizardsService } from './wizards.service';
import { IpfsWizardRepository } from './repositories/ipfs-wizard.repository';
import { PrismaWizardRepository } from './repositories/prisma-wizard.repository';
import { mock, MockProxy } from 'jest-mock-extended';

describe('WizardsService', () => {
  let service: WizardsService;
  let ipfsRepositoryMock: MockProxy<IpfsWizardRepository>;
  let prismaRepositoryMock: MockProxy<PrismaWizardRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WizardsService,
        { provide: IpfsWizardRepository, useValue: mock(IpfsWizardRepository) },
        {
          provide: PrismaWizardRepository,
          useValue: mock(PrismaWizardRepository),
        },
      ],
    }).compile();

    service = module.get<WizardsService>(WizardsService);
    ipfsRepositoryMock = module.get(IpfsWizardRepository);
    prismaRepositoryMock = module.get(PrismaWizardRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
