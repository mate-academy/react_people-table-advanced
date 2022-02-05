// eslint-disable-next-line
/// <reference types="react-scripts" />
interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  fatherNameSlug?: Person | undefined,
  motherName: string,
  motherNameSlug?: Person | undefined,
  slug: string,
}
