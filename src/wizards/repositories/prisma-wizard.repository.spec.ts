import { TestingModule, Test } from '@nestjs/testing';
import { MockProxy, mock } from 'jest-mock-extended';
import { PrismaWizardRepository } from './prisma-wizard.repository';
import { PrismaService } from '../../prisma/prisma.service';

describe('PrismaWizardRepository', () => {
  let repository: PrismaWizardRepository;
  let prismaServiceMock: MockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaWizardRepository,
        { provide: PrismaService, useValue: mock(PrismaService) },
      ],
    }).compile();

    repository = module.get<PrismaWizardRepository>(PrismaWizardRepository);
    prismaServiceMock = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
