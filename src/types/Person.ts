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
  noError,
  Wrong,
  Empty,
}

export enum MagicWords {
  FEMALE = 'f',
  MALE = 'm',
}

export enum Sex {
  All = 'all',
  MALE = 'm',
  FEMALE = 'f',
}
