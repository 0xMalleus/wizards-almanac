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

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('wizards')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wizardsService.findOne(+id);
  }

  @Get()
  list(@Query() query: ListWizardsDto) {
    return this.wizardsService.findMany(query);
  }

  @UseGuards(ApiKeyGuard)
  @Patch()
  @ApiBearerAuth()
  createOrUpdate(@Body() upsertWizardDto: UpsertWizardDto) {
    return this.wizardsService.upsert(upsertWizardDto);
  }
}
