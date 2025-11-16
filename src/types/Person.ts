export interface Person {
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

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export enum Sex {
  Male = 'm',
  Female = 'f',
}

export type Filters = {
  sex: Sex | null;
  query: string | null;
  centuries: number[];
};

export enum SortField {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}
