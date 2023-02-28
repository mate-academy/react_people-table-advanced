import { Person } from '../types';

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
) => {
  let visiblePeople = [...people];

  function centuryFromYear(year: number) {
    return Math.floor((year + 99) / 100);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const queryValue = query.toLowerCase();
      const dataToSearch = (person.name
          + person.motherName + person.fatherName).toLowerCase();

      if (dataToSearch.includes(queryValue)) {
        return person;
      }

      return null;
    });
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      const personCenturie = centuryFromYear(person.died);

      if (centuries.find(c => +c === personCenturie)) {
        return person;
      }

      return null;
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => (
      person.sex === sex
    ));
  }

  return visiblePeople;
};
