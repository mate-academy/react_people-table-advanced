import { Person } from '../types';

export const getFilteredPeople = (
  query: string,
  sex: string,
  centuries: string[],
  people: Person[],
): Person[] => {
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      if (person.name.toLowerCase().includes(query.toLowerCase())) {
        return person;
      }

      if (
        person.motherName &&
        person.motherName.toLowerCase().includes(query.toLowerCase())
      ) {
        return person;
      }

      if (
        person.fatherName &&
        person.fatherName.toLowerCase().includes(query.toLowerCase())
      ) {
        return person;
      }

      return;
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => {
      if (person.sex === sex) {
        return person;
      }

      return;
    });
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      const CenturyNumber = Math.floor(person.born / 100) + 1;
      const bornString = CenturyNumber.toString();

      const Century = bornString.slice(0, 2);

      if (centuries.includes(Century)) {
        return person;
      }

      return;
    });
  }

  return filteredPeople;
};
