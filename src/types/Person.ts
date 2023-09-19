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

export enum SelectedSex {
  ALL = 'all',
  MALE = 'male',
  FEMALE = 'female',
}

export interface FilterParams {
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
}
