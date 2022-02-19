export interface Person {
  [key: string]: string | number | Person | null
  name: 'Carolus Haverbeke',
  sex: 'm',
  born: 1832,
  died: 1905,
  fatherName: 'Carel Haverbeke',
  motherName: 'Maria van Brussel',
  slug: 'carolus-haverbeke-1832'
  father: Person | null,
  mother: Person | null,
}
