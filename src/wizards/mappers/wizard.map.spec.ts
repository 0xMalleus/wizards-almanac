import { WizardMap } from './wizard.map';

describe('WizardMap', () => {
  it('should be defined', () => {
    expect(new WizardMap()).toBeDefined();
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
        const wizardMap = new WizardMap();
        const wizard = wizardMap.toDomain(validWizardProps);

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
        const wizardMap = new WizardMap();
        const outOfLowerBoundWizard = {
          ...validWizardProps,
          id: -1,
        };

        const outOfUpperBoundWizard = {
          ...validWizardProps,
          id: 20000,
        };

        expect(() => wizardMap.toDomain(outOfLowerBoundWizard)).toThrow();
        expect(() => wizardMap.toDomain(outOfUpperBoundWizard)).toThrow();
      });

      it('should require id to be a number', () => {
        const wizardMap = new WizardMap();
        const invalidIdWizard = {
          ...validWizardProps,
          id: 'not a number',
        };

        expect(() => wizardMap.toDomain(invalidIdWizard)).toThrow();
      });
    });

    describe('when validating name...', () => {
      it('should require name to be a string', () => {
        const wizardMap = new WizardMap();
        const invalidNameWizard = {
          ...validWizardProps,
          name: {},
        };

        expect(() => wizardMap.toDomain(invalidNameWizard)).toThrow();
      });
    });

    describe('when validating image...', () => {
      it('should require image to be a valid url', () => {
        const wizardMap = new WizardMap();
        const invalidImageWizard = {
          ...validWizardProps,
          image: 'not a valid url',
        };

        expect(() => wizardMap.toDomain(invalidImageWizard)).toThrow();
      });
    });

    describe('when validating backgroundColor...', () => {
      it('should require backgroundColor to be a valid hex color', () => {
        const wizardMap = new WizardMap();
        const invalidBackgroundColorWizard = {
          ...validWizardProps,
          backgroundColor: 'not a valid hex color',
        };

        expect(() =>
          wizardMap.toDomain(invalidBackgroundColorWizard),
        ).toThrow();
      });
    });

    describe('when validating traits...', () => {
      it('should require traits to be an array', () => {
        const wizardMap = new WizardMap();
        const invalidTraitsWizard = {
          ...validWizardProps,
          traits: {},
        };

        expect(() => wizardMap.toDomain(invalidTraitsWizard)).toThrow();
      });

      it('should only accept valid wizard traits', () => {
        const wizardMap = new WizardMap();
        const invalidTraitsWizard = {
          ...validWizardProps,
          traits: [
            { type: 'invalid', value: 'invalid' },
            { type: 'invalid', value: 'invalid' },
          ],
        };

        expect(() => wizardMap.toDomain(invalidTraitsWizard)).toThrow();
      });
    });
  });
});
