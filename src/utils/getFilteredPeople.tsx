import { Person } from '../types';

function getCentury(year: number) {
  return Math.ceil(year / 100).toString();
}

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
      const bornString = getCentury(person.born);

      if (centuries.includes(bornString)) {
        return person;
      }

      return;
    });
  }

  return filteredPeople;
};
