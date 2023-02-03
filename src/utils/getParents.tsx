import { Person } from '../types';

export const getParents = (
  { motherName, fatherName }: Person,
  array: Person[],
) => ({
  mother: array.find(({ name }) => name === motherName),
  father: array.find(({ name }) => name === fatherName),
});
