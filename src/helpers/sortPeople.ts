import { Person } from '../types';

type Parameters = {
  column: string;
  centuries: string[] | string;
  male: string;
  query: string;
  order: string;
};

type SortPeople = (people: Person[], parameters: Parameters) => Person[];

export const sortPeople: SortPeople = (
  people,
  { column, male = '', centuries = [], query = '', order = 'asc' },
) => {
  const direction = order === 'desc' ? -1 : 1;
  let peopleCopy = [...people];

  if (column.length) {
    peopleCopy = peopleCopy.sort((a, b) => {
      if (column === 'died' || column === 'born') {
        return (a[column] - b[column]) * direction;
      }

      if (column === 'name' || column === 'sex') {
        return a[column].localeCompare(b[column]) * direction;
      }

      return 0;
    });
  }

  if (male.length) {
    peopleCopy = peopleCopy.filter(person => person.sex === male);
  }

  if (centuries.length) {
    peopleCopy = peopleCopy.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  if (query.length) {
    peopleCopy = peopleCopy.filter(person =>
      person.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  return peopleCopy;
};
