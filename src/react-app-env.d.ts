// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string | null;
  fatherName: string | null;
  slug: string;
  father?: Person;
  mother?: Person;
}
