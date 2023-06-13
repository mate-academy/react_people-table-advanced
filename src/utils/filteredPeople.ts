import { Person } from '../types';

export const filteredPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
): Person[] => {
  let filterPeople = [...people];

  if (query) {
    filterPeople = filterPeople.filter(person => (
      person.name.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query)
    ));
  }

  if (sex) {
    filterPeople = filterPeople.filter((person) => person.sex === sex);
  }

  if (centuries.length > 0) {
    filterPeople = filterPeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  return filterPeople;
};
