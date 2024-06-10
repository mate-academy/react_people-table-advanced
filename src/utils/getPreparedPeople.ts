import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  query: string,
  century: string[],
  sex: string,
  sort: string,
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
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);

        case 'sex':
          return a.sex.localeCompare(b.sex);

        case 'born':
          return a.born - b.born;

        case 'died':
          return a.died - b.died;

        default:
          return 0;
      }
    });
  }

  return visiblePeople;
};
