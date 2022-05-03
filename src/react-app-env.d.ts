/// <reference types="react-scripts" />

interface People {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string
}

interface UpdatedPersons {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string
  mother: People | undefined,
  father: People | undefined,
}
