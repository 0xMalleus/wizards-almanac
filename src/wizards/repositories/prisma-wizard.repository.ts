import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ListWizardsDto } from '../dto/list-wizards.dto';
import { Wizard } from '../entities/wizard.entity';
import { WizardMap } from '../mappers/wizard.map';
import { Prisma } from '@prisma/client';
import { identity } from 'rxjs';
@Injectable()
export class PrismaWizardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyWizards(query: ListWizardsDto) {
    const {
      nameIncludes,
      id,
      background,
      body,
      head,
      prop,
      familiar,
      rune,
      offset,
      limit,
    } = query;

    const where: Prisma.WizardsWhereInput = {};

    if (nameIncludes) {
      where.name = { contains: nameIncludes };
    }

    if (id && id.length) {
      where.id = { in: id };
    }

    if (background && background.length) {
      where.backgroundName = { in: background };
    }

    if (body && body.length) {
      where.bodyName = { in: body };
    }

    if (head && head.length) {
      where.headName = { in: head };
    }

    if (prop && prop.length) {
      where.propName = { in: prop };
    }

    if (familiar && familiar.length) {
      where.familiarName = { in: familiar };
    }

    if (rune && rune.length) {
      where.runeName = { in: rune };
    }

    const wizards = await this.prisma.wizards.findMany({
      where,
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
      take: limit,
      skip: offset,
    });

    return wizards.map((wizard) =>
      WizardMap.toDomain({
        id: wizard.id,
        name: wizard.name,
        image: wizard.image,
        background: wizard.Background,
        body: wizard.Body,
        head: wizard.Head,
        prop: wizard.Prop,
        familiar: wizard.Familiar,
        rune: wizard.Rune,
      }),
    );
  }

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
