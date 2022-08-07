export type Person = {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  father: Person | null,
  mother: Person | null,
  slug: string
};
