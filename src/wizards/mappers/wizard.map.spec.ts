import { WizardMap } from './wizard.map';

describe('WizardMap', () => {
  it('should be defined', () => {
    expect(WizardMap).toBeDefined();
  });

  describe('toDomain()...', () => {
    const validWizardProps = {
      id: 2633,
      name: 'Illusionist Aleister of the Hall',
      image:
        'https://cloudflare-ipfs.com/ipfs/QmbtiPZfgUzHd79T1aPcL9yZnhGFmzwar7h4vmfV6rV8Kq/2633.png',
      traits: [
        { type: 'serial', value: '2633' },
        { type: 'background', value: 'Black' },
        { type: 'body', value: 'Aristocrat Blue' },
        { type: 'head', value: 'Professor' },
        { type: 'prop', value: "Isaac's Apple" },
        { type: 'familiar', value: 'Great Owl' },
        { type: 'rune', value: 'Rune of Uranus' },
      ],
      backgroundColor: '000000',
    };

    describe('when the input is valid...', () => {
      it('should return a valid wizard', () => {
        const wizard = WizardMap.toDomain(validWizardProps);

        expect(wizard.id).toEqual(validWizardProps.id);
        expect(wizard.name).toEqual(validWizardProps.name);
        expect(wizard.image).toEqual(validWizardProps.image);
        expect(wizard.backgroundColor).toEqual(
          validWizardProps.backgroundColor,
        );
        expect(wizard.traits).toEqual(validWizardProps.traits);
      });
    });

    describe('when validating id...', () => {
      it('should require id to be between 0 and 10000', () => {
        const outOfLowerBoundWizard = {
          ...validWizardProps,
          id: -1,
        };

        const outOfUpperBoundWizard = {
          ...validWizardProps,
          id: 20000,
        };

        expect(() => WizardMap.toDomain(outOfLowerBoundWizard)).toThrow();
        expect(() => WizardMap.toDomain(outOfUpperBoundWizard)).toThrow();
      });

      it('should require id to be a number', () => {
        const invalidIdWizard = {
          ...validWizardProps,
          id: 'not a number',
        };

        expect(() => WizardMap.toDomain(invalidIdWizard)).toThrow();
      });
    });

    describe('when validating name...', () => {
      it('should require name to be a string', () => {
        const invalidNameWizard = {
          ...validWizardProps,
          name: {},
        };

        expect(() => WizardMap.toDomain(invalidNameWizard)).toThrow();
      });
    });

    describe('when validating image...', () => {
      it('should require image to be a valid url', () => {
        const invalidImageWizard = {
          ...validWizardProps,
          image: 'not a valid url',
        };

        expect(() => WizardMap.toDomain(invalidImageWizard)).toThrow();
      });
    });

    describe('when validating backgroundColor...', () => {
      it('should require backgroundColor to be a valid hex color', () => {
        const invalidBackgroundColorWizard = {
          ...validWizardProps,
          backgroundColor: 'not a valid hex color',
        };

        expect(() =>
          WizardMap.toDomain(invalidBackgroundColorWizard),
        ).toThrow();
      });
    });

    describe('when validating traits...', () => {
      it('should require traits to be an array', () => {
        const invalidTraitsWizard = {
          ...validWizardProps,
          traits: {},
        };

        expect(() => WizardMap.toDomain(invalidTraitsWizard)).toThrow();
      });

      it('should only accept valid wizard traits', () => {
        const invalidTraitsWizard = {
          ...validWizardProps,
          traits: [
            { type: 'invalid', value: 'invalid' },
            { type: 'invalid', value: 'invalid' },
          ],
        };

        expect(() => WizardMap.toDomain(invalidTraitsWizard)).toThrow();
      });
    });
  });
});
