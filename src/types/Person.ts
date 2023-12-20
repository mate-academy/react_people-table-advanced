export interface Person {
  name: string,
  sex: SexType,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
  mother?: Person,
  father?: Person,
}

export enum SexType {
  male = 'm',
  female = 'f',
  undefined = '',
}

export enum SearchField {
  Sex = 'sex',
  Centuries = 'centuries',
  Query = 'query',
}

export enum SortParam {
  Sex = 'sex',
  Name = 'name',
  Born = 'born',
  Died = 'died',
}
