import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  query: string,
  century: string[],
  sex: string,
  sort: string,
  order: 'asc' | 'desc',
) => {
  let visiblePeople = [...people];

  if (query) {
    const preparedQuery = query.toLowerCase().trim();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(preparedQuery) ||
        person.motherName?.toLowerCase().includes(preparedQuery) ||
        person.fatherName?.toLowerCase().includes(preparedQuery),
    );
  }

  if (century.length) {
    visiblePeople = visiblePeople.filter(person =>
      century.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      let result = 0;

      if (sort === 'name' || sort === 'sex') {
        result = a[sort].localeCompare(b[sort]);
      }

      if (sort === 'born' || sort === 'died') {
        result = a[sort] - b[sort];
      }

      return order === 'asc' ? result : result * -1;
    });
  }

  return visiblePeople;
};
