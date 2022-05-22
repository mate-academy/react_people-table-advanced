// eslint-disable-next-line
/// <reference types="react-scripts" />

type Person = {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
  father? : Person,
  mother? : Person,
};
