import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryWizardsDto } from '../dto/query-wizards.dto';
import { Wizard } from '../entities/wizard.entity';
import { WizardMap } from '../mappers/wizard.map';

@Injectable()
export class PrismaWizardRepository {
  constructor(private readonly prisma: PrismaService) {}

  // async findManyWizards(query: QueryWizardsDto) {
  //   const {
  //     name,
  //     background,
  //     body,
  //     head,
  //     prop,
  //     familiar,
  //     rune,
  //     limit,
  //     offset,
  //   } = query;

  //   const wizardWhere = {};

  //   if (name) {
  //     wizardWhere.name = {
  //       contains: name,
  //     };
  //   }

  //   return await this.prisma.wizards.findMany({
  //     where: wizardWhere,
  //     select: {
  //       id: true,
  //       name: true,
  //       image: true,
  //       backgroundColor: true,
  //       traits: {
  //         select: {
  //           type: true,
  //           value: true,
  //         },
  //       },
  //     },
  //   });
  // }

  async getWizardById(id: number) {
    const wizardOrNull = await this.prisma.wizards.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        Background: true,
        Body: true,
        Head: true,
        Prop: true,
        Familiar: true,
        Rune: true,
      },
      rejectOnNotFound: false,
    });

    if (wizardOrNull === null) {
      return null;
    }

    const {
      Background: background,
      Body: body,
      Head: head,
      Prop: prop,
      Familiar: familiar,
      Rune: rune,
    } = wizardOrNull;

    return WizardMap.toDomain({
      ...wizardOrNull,
      background,
      body,
      head,
      prop,
      familiar,
      rune,
    });
  }

  async upsertWizardById(id: number, wizard: Wizard) {
    const { background, body, head, prop, familiar, rune } = wizard;

    const backgroundCreateOrConnectProps = {
      where: {
        name: background.name,
      },
      create: background,
    };

    const bodyCreateOrConnectProps = {
      where: {
        name: body.name,
      },
      create: body,
    };

    const headCreateOrConnectProps = {
      where: {
        name: head.name,
      },
      create: head,
    };

    const propCreateOrConnectProps = {
      where: {
        name: prop.name,
      },
      create: prop,
    };

    const familiarCreateOrConnectProps = {
      where: {
        name: familiar.name,
      },
      create: familiar,
    };

    const runeCreateOrConnectProps = {
      where: {
        name: rune.name,
      },
      create: rune,
    };

    return await this.prisma.wizards.upsert({
      where: { id },
      create: {
        id: wizard.id,
        name: wizard.name,
        image: wizard.image,
        Background: {
          connectOrCreate: backgroundCreateOrConnectProps,
        },
        Body: {
          connectOrCreate: bodyCreateOrConnectProps,
        },
        Head: {
          connectOrCreate: headCreateOrConnectProps,
        },
        Prop: {
          connectOrCreate: propCreateOrConnectProps,
        },
        Familiar: {
          connectOrCreate: familiarCreateOrConnectProps,
        },
        Rune: {
          connectOrCreate: runeCreateOrConnectProps,
        },
      },
      update: {
        name: wizard.name,
        image: wizard.image,
        Background: {
          connectOrCreate: backgroundCreateOrConnectProps,
        },
        Body: {
          connectOrCreate: bodyCreateOrConnectProps,
        },
        Head: {
          connectOrCreate: headCreateOrConnectProps,
        },
        Prop: {
          connectOrCreate: propCreateOrConnectProps,
        },
        Familiar: {
          connectOrCreate: familiarCreateOrConnectProps,
        },
        Rune: {
          connectOrCreate: runeCreateOrConnectProps,
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
