import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryWizardsDto } from '../dto/query-wizards.dto';
import { Wizard } from '../entities/wizard.entity';

@Injectable()
export class PrismaWizardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyWizards(query: QueryWizardsDto) {
    const {
      name,
      background,
      body,
      head,
      prop,
      familiar,
      rune,
      limit,
      offset,
    } = query;

    const wizardWhere = {};

    if (name) {
      wizardWhere.name = {
        contains: name,
      };
    }

    return await this.prisma.wizards.findMany({
      where: wizardWhere,
      select: {
        id: true,
        name: true,
        image: true,
        backgroundColor: true,
        traits: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });
  }

  async getWizardById(id: number) {
    return await this.prisma.wizards.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        backgroundColor: true,
        traits: {
          select: {
            type: true,
            value: true,
          },
        },
      },
      rejectOnNotFound: false,
    });
  }

  async upsertWizardById(id: number, wizard: Wizard) {
    const wizardUpsertProps = {
      id: wizard.id,
      name: wizard.name,
      image: wizard.image,
      backgroundColor: wizard.backgroundColor,
    };

    const wizardTraitCreateOrConnectProps = wizard.traits.map((trait) => {
      return {
        where: { type_value: { type: trait.type, value: trait.value } },
        create: {
          type: trait.type,
          value: trait.value,
        },
      };
    });

    return await this.prisma.wizards.upsert({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        backgroundColor: true,
        traits: {
          select: {
            type: true,
            value: true,
          },
        },
      },
      update: {
        ...wizardUpsertProps,
        traits: {
          connectOrCreate: wizardTraitCreateOrConnectProps,
        },
      },
      create: {
        ...wizardUpsertProps,
        traits: {
          connectOrCreate: wizardTraitCreateOrConnectProps,
        },
      },
    });
  }

  async deleteById(id: number) {
    // We use deleteMany to avoid exception being thrown when record with the given name does not exist
    return await this.prisma.wizards.deleteMany({
      where: { id },
    });
  }
}
