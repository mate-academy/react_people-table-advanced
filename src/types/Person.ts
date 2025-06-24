// export interface Person {
//   motherSlug: any;
//   name: string;
//   sex: string;
//   born: number;
//   died: number;
//   fatherName: string | null;
//   motherName: string | null;
//   slug: string;
//   mother?: Person;
//   father?: Person;
// }

export interface Person {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  motherName?: string;
  motherSlug?: string;
  motherSex?: 'm' | 'f';
  fatherName?: string;
  fatherSlug?: string;
  fatherSex?: 'm' | 'f';
  slug: string;
}
