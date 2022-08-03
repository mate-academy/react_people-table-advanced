// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Person {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother: Person | null;
  father: Person | null;
}

type Params = {
  [key: string]: string,
};
