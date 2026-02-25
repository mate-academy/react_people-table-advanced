export interface NormalizedParent {
  name: string | null;
  slug: string | null;
  person: Person | null;
}

export interface Person {
  slug: string;
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number | null;

  // raw API fields
  fatherName: string | null;
  fatherSlug: string | null;
  motherName: string | null;
  motherSlug: string | null;

  // normalized parents (always defined)
  mother: NormalizedParent;
  father: NormalizedParent;
}
