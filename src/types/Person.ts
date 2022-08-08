export interface Person {
  name: string,
  sex: string,
  born: 1832,
  died: 1905,
  fatherName: string,
  motherName: string,
  slug: string,
  mother: Person | null,
  father: Person | null,
}
