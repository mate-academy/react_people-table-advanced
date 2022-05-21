/// <reference types="react-scripts" />

interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

interface Child {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  father: Person | null;
  motherName: string;
  mother: Person | null;
  slug: string;
}

type Props = {
  person: People[],
};
