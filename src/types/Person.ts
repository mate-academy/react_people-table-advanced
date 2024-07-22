export interface Person {
  name: string;
  sex: Gender;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}

export enum Gender {
  Male = 'm',
  Female = 'f',
}
