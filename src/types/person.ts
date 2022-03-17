export interface Person {
  name: string
  sex: string
  born: number
  died: number
  fatherName: string
  motherName: string
  slug: string
  mother: Person | undefined
  father: Person | undefined
}
