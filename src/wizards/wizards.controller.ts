import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WizardsService } from './wizards.service';
import { CreateWizardDto } from './dto/create-wizard.dto';
import { UpdateWizardDto } from './dto/update-wizard.dto';

@Controller('wizards')
export class WizardsController {
  constructor(private readonly wizardsService: WizardsService) {}

  @Post()
  create(@Body() createWizardDto: CreateWizardDto) {
    return this.wizardsService.create(createWizardDto);
  }

  @Get()
  findAll() {
    return this.wizardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wizardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWizardDto: UpdateWizardDto) {
    return this.wizardsService.update(+id, updateWizardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wizardsService.remove(+id);
  }
}
