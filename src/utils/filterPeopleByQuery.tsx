import { Person } from '../types';

export const filterPeopleByQuery = (query: string, arrayOfPeople: Person[]) => {
  return arrayOfPeople.filter((person) => (query.toLowerCase().length !== 0
    ? person.name.toLowerCase().includes(query.toLowerCase())
    : person));
};
