export interface Person {
  [x: string]: any;
  includes(lowerQuery: string): unknown;
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}

export enum Filter {
  All = 'All',
  Male = 'Male',
  Female = 'Female',
}
