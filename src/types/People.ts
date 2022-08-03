export interface People {
  name: string,
  sex: string,
  born: number,
  died: number,
  motherName: string | People,
  fatherName: string | People,
  slug: string | null,
}
