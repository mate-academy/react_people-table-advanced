export type Person = {
  name: string,
  sex: string,
  born: number,
  died: number,
  motherName: string,
  fatherName: string,
  mother?: Person | undefined,
  father?: Person | undefined,
  slug?: string;
};

export type PersonParents = {
  name: string,
  sex: string,
  born: number,
  died: number,
  motherName: Person,
  fatherName: Person,
};
