/// <reference types="react-scripts" />


interface FormFields {
  name: string,
  sex: string,
  born: number | '',
  died: number | '',
  motherName: string,
  fatherName: string,
  [key: string]: unknown,
}

interface Person {
  slug: string,
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  father: Person | undefined,
  mother: Person | undefined,
  [key: string]: unknown,
}

interface Errors {
  [key: string]: string,
}