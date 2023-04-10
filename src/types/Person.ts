export interface PersonType {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
  mother?: PersonType,
  father?: PersonType,
}

export enum SortType {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}
