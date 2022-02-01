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
} from '@nestjs/common';
import { WizardsService } from './wizards.service';
import { UpsertWizardDto } from './dto/upsert-wizard.dto';
import { QueryWizardsDto } from './dto/query-wizards.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('wizards')
export class WizardsController {
  constructor(private readonly wizardsService: WizardsService) {}

  @UseGuards(ApiKeyGuard)
  @Patch()
  createOrUpdate(@Body() upsertWizardDto: UpsertWizardDto) {
    return this.wizardsService.upsert(upsertWizardDto);
  }

  @Get()
  findAll(@Query() query: QueryWizardsDto) {
    return this.wizardsService.findMany(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wizardsService.findOne(+id);
  }
}
