import { Test, TestingModule } from '@nestjs/testing';
import { WizardsController } from './wizards.controller';
import { WizardsService } from './wizards.service';
import { mock, MockProxy } from 'jest-mock-extended';

describe('WizardsController', () => {
  let controller: WizardsController;
  let wizardServiceMock: MockProxy<WizardsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WizardsController],
      providers: [{ provide: WizardsService, useValue: mock(WizardsService) }],
    }).compile();

    controller = module.get<WizardsController>(WizardsController);
    wizardServiceMock = module.get(WizardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
