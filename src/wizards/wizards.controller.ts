import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WizardsService } from './wizards.service';
import { UpsertWizardDto } from './dto/upsert-wizard.dto';
import { ListWizardsDto } from './dto/list-wizards.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import {
  classToPlain,
  classToPlainFromExist,
  instanceToPlain,
} from 'class-transformer';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
@Controller('wizards')
export class WizardsController {
  constructor(private readonly wizardsService: WizardsService) {}

  @UseGuards(ApiKeyGuard)
  @Patch()
  createOrUpdate(@Body() upsertWizardDto: UpsertWizardDto) {
    return this.wizardsService.upsert(upsertWizardDto);
  }

  @Get()
  list(@Query() query: ListWizardsDto) {
    return this.wizardsService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wizardsService.findOne(+id);
  }
}
