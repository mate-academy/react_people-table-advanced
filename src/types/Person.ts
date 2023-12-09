export interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
  mother?: Person,
  father?: Person,
}

export enum PersonSort {
  NONE = '',
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export type PersonSortKeys = keyof Omit<Person
, 'fatherName' | 'motherName' | 'slug' | 'mother' | 'father'>;
