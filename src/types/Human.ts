export interface Human {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

export interface HumanWithParents extends Human{
  mother: Human | null;
  father: Human | null;
}
