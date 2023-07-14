import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
) => {
  const filteredPeople = [...people];

  if (query) {
    filteredPeople.filter(person => {
      const preparedQuery = query.toLowerCase().trim();

      return person.name.toLowerCase().includes(preparedQuery)
        || person.motherName?.toLowerCase().includes(preparedQuery)
        || person.fatherName?.toLowerCase().includes(preparedQuery);
    });
  }

  if (sex) {
    filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredPeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  return filteredPeople;
};
