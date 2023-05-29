import { Person } from '../types';

export const toFindParents = (people: Person[], personName: string | null) => {
  const personParent = people.find(({ name }) => name === personName);

  return personParent;
};
