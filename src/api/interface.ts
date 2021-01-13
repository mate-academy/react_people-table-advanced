export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  father: ServerIPerson | undefined;
  mother: ServerIPerson | undefined;
  slug: string;
}

export interface ServerIPerson {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}
