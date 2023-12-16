export interface Person {
  name: string,
  sex: Sex,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
  mother?: Person,
  father?: Person,
}

export enum Sex {
  male = 'm',
  female = 'f',
}

export enum SearchField {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Sex = 'sex',
  Centuries = 'centuries',
  Query = 'query',
}

export enum SortParam {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Sex = 'sex',
  Name = 'name',
  Born = 'born',
  Died = 'died',
}
