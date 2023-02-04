import { Person } from '../../types';

export const getPersonByName = (ParentName: string | null, arr: Person[]) => (
  arr.find(person => person.name === ParentName)
);
