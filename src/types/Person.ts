export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  motherSlug: string | null;
  fatherSlug: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}
