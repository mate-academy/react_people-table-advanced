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

export enum ErrorOption {
  NoError,
  Wrong,
  Empty,
}

export enum Sex {
  All = 'all',
  MALE = 'm',
  FEMALE = 'f',
}

export enum SortBy {
  ByName = 'name',
  BySex = 'sex',
  ByBorn = 'born',
  ByDied = 'died',
}
