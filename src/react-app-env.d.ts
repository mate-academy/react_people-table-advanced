// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  motherName: string | null,
  fatherName: string | null,
  mother?: Person | null,
  father?: Person | null,
  slug: string,
}
