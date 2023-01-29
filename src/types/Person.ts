export interface Person {
  [x: string]: any;
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
