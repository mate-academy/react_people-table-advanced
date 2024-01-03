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

export enum Sex {
  Male = 'm',
  Female = 'f',
}

export enum SortBy {
  Asc = 'asc',
  Desc = 'desc',
}
