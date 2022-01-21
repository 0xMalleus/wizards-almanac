export class Wizard {
  id: number;
  name: string;
  image: string;
  backgroundColor: string;
  traits: Trait[];
}

export class Trait {
  type: string;
  value: string;
}
