export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  getMother?: () => Person | undefined;
  getFather?: () => Person | undefined;
  slug: string;
  mother?: Person;
  father?: Person;
  century?: number;
}
