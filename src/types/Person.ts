export interface Person {
  name: string,
  sex: 'f' | 'm',
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
  mother: Person | null,
  father: Person | null,
}

export enum PersonSex {
  Male = 'm',
  Female = 'f',
}
