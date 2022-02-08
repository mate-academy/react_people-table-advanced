/// <reference types="react-scripts" />
interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  slug: string,
  motherName: null | string,
  fatherName: null | string,
}

interface ProcessedPerson extends Person {
  father: null | Person,
  mother: null | Person,
}

interface FormFields {
  name: string,
  sex: 'm' | 'f' | null,
  born: number | null,
  died: number | null,
  motherName: string,
  fatherName: string,
}

interface FormErrors {
  name: {
    isEmpty: boolean,
    hasForbiddenSymbols: boolean,
    userAlreadyExists: boolean,
  },
  born: boolean,
  died: boolean,
}
