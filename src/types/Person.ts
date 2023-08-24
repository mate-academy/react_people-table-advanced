export interface Person {
  name: string,
  sex: PersonSex.Male | PersonSex.Female,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
  mother?: Person,
  father?: Person,
}

export enum PersonSex {
  Male = 'm',
  Female = 'f',
}
