import { Person } from '../types/Person';

export const filterPeople = (
  people: Person[],
  centuries: string[],
  query: string,
  sex: string,
): Person[] => {
  let filteredPeople = [...people];

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  return filteredPeople;
};
