import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
) => {
  let filteredPeople = [...people];

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const preparedQuery = query.toLowerCase().trim();

      return person.name.toLowerCase().includes(preparedQuery)
        || person.motherName?.toLowerCase().includes(preparedQuery)
        || person.fatherName?.toLowerCase().includes(preparedQuery);
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  return filteredPeople;
};
