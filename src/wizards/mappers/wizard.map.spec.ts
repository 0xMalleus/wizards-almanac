import { Wizard } from '../entities/wizard.entity';
import { WizardMap } from './wizard.map';

describe('WizardMap', () => {
  it('should be defined', () => {
    expect(WizardMap).toBeDefined();
  });

  describe('toDomain()...', () => {
    const validRawWizard = {
      id: 2633,
      name: 'Illusionist Aleister of the Hall',
      image:
        'https://cloudflare-ipfs.com/ipfs/QmfUgAKioFE8taS41a2XEjYFrkbfpVyXYRt7c6iqTZVy9G/2633',
      background: {
        hex: '000000',
        name: 'Black',
      },
      body: {
        name: 'Aristocrat Blue',
      },
      head: {
        name: 'Professor',
      },
      prop: {
        name: "Isaac's Apple",
      },
      familiar: {
        name: 'Great Owl',
      },
      rune: {
        name: 'Rune of Uranus',
      },
    };

    describe('when the input is valid...', () => {
      it('should return a valid wizard', () => {
        const wizard = WizardMap.toDomain(validRawWizard);

        expect(wizard).toBeInstanceOf(Wizard);
      });
    });

    describe('when validating id...', () => {
      it('should require id to be between 0 and 10000', () => {
        const outOfLowerBoundWizard = {
          ...validRawWizard,
          id: -1,
        };

        const outOfUpperBoundWizard = {
          ...validRawWizard,
          id: 20000,
        };

        expect(() => WizardMap.toDomain(outOfLowerBoundWizard)).toThrow();
        expect(() => WizardMap.toDomain(outOfUpperBoundWizard)).toThrow();
      });

      it('should require id to be a number', () => {
        const invalidIdWizard = {
          ...validRawWizard,
          id: 'not a number',
        };

        expect(() => WizardMap.toDomain(invalidIdWizard)).toThrow();
      });
    });

    describe('when validating name...', () => {
      it('should require name to be a string', () => {
        const invalidNameWizard = {
          ...validRawWizard,
          name: {},
        };

        expect(() => WizardMap.toDomain(invalidNameWizard)).toThrow();
      });
    });

    describe('when validating image...', () => {
      it('should require image to be a valid url', () => {
        const invalidImageWizard = {
          ...validRawWizard,
          image: 'not a valid url',
        };

        expect(() => WizardMap.toDomain(invalidImageWizard)).toThrow();
      });
    });

    describe('when validating background...', () => {
      describe('when validating background.hex...', () => {
        it('should require hex to be a valid hex color', () => {
          const invalidHexWizard = {
            ...validRawWizard,
            background: {
              hex: 'not a valid hex color',
              name: 'Black',
            },
          };

          expect(() => WizardMap.toDomain(invalidHexWizard)).toThrow();
        });
      });

      describe('when validating background.name...', () => {
        it('should require name to be a string', () => {
          const invalidNameWizard = {
            ...validRawWizard,
            background: {
              hex: '000000',
              name: {},
            },
          };

          expect(() => WizardMap.toDomain(invalidNameWizard)).toThrow();
        });
      });
    });

    describe('when validating body...', () => {
      it('should require body.name to be a string', () => {
        const invalidBodyWizard = {
          ...validRawWizard,
          body: {
            name: {},
          },
        };

        expect(() => WizardMap.toDomain(invalidBodyWizard)).toThrow();
      });
    });

    describe('when validating head...', () => {
      it('should require head.name to be a string', () => {
        const invalidHeadWizard = {
          ...validRawWizard,
          head: {},
        };

        expect(() => WizardMap.toDomain(invalidHeadWizard)).toThrow();
      });
    });

    describe('when validating prop...', () => {
      it('should require prop.name to be a string', () => {
        const invalidPropWizard = {
          ...validRawWizard,
          prop: {},
        };

        expect(() => WizardMap.toDomain(invalidPropWizard)).toThrow();
      });
    });

    describe('when validating familiar...', () => {
      it('should require familiar.name to be a string', () => {
        const invalidFamiliarWizard = {
          ...validRawWizard,
          familiar: {},
        };

        expect(() => WizardMap.toDomain(invalidFamiliarWizard)).toThrow();
      });
    });

    describe('when validating rune...', () => {
      it('should require rune.name to be a string', () => {
        const invalidRuneWizard = {
          ...validRawWizard,
          rune: {},
        };

        expect(() => WizardMap.toDomain(invalidRuneWizard)).toThrow();
      });
    });
  });

  describe('toDomainFromIpfs()...', () => {
    const validRawIpfsWizard = {
      name: 'Illusionist Aleister of the Hall',
      image: 'ipfs://QmbtiPZfgUzHd79T1aPcL9yZnhGFmzwar7h4vmfV6rV8Kq/2633.png',
      attributes: [
        {
          trait_type: 'Serial',
          display_type: 'number',
          value: 2633,
        },
        {
          trait_type: 'background',
          value: 'Black',
        },
        {
          trait_type: 'body',
          value: 'Aristocrat Blue',
        },
        {
          trait_type: 'head',
          value: 'Professor',
        },
        {
          trait_type: 'prop',
          value: "Isaac's Apple",
        },
        {
          trait_type: 'familiar',
          value: 'Great Owl',
        },
        {
          trait_type: 'rune',
          value: 'Rune of Uranus',
        },
      ],
      background_color: '000000',
    };

    describe('when the input is valid...', () => {
      it('should return a valid wizard', () => {
        const wizard = WizardMap.toDomainFromIpfs(validRawIpfsWizard);

        expect(wizard).toBeInstanceOf(Wizard);
      });
    });
  });
});
