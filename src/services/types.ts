export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

export interface PersonFull extends Person {
  father?: Person;
  mother?: Person;
}

export enum SortByOptions {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export enum SortType {
  Asc = 'asc',
  Desc = 'desc',
}
