import { Person } from '../types';

const ZERO_YEARS = 1500 | 1600 | 1700 | 1800 | 1900 | 2000;

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
      const bornCenturyNumber =
        person.born === ZERO_YEARS ? person.born : person.born + 100;
      const bornString = bornCenturyNumber.toString();

      const bornCentury = bornString.slice(0, 2);

      if (centuries.includes(bornCentury)) {
        return person;
      }

      return;
    });
  }

  return filteredPeople;
};
