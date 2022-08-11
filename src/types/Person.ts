export interface Person {
  name: string,
  sex: 'm' | 'f',
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
  father: Person | null,
  mother: Person | null,
}
