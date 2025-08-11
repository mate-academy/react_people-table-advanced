import { Person } from '../types';

export const getHuman = (humanName: string | null, people: Person[]) => {
  if (!humanName) {
    return null;
  }

  const foundPerson = people.find(p => p.name === humanName);

  return foundPerson ? foundPerson : humanName;
};
