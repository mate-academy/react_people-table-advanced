// eslint-disable-next-line
/// <reference types="react-scripts" />

type Person = {
  name: string,
  sex: string,
  born: number,
  died: number,
  motherName: string | null,
  fatherName: string | null,
  slug: string,
  mother: Person | undefined
  father: Person | undefined
};
