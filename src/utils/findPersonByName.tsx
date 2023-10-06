import { Person } from '../types';

export const findPersonByName = (
  personName: string | null,
  people: Person[],
) => {
  return people.find(({ name }) => name === personName);
};
