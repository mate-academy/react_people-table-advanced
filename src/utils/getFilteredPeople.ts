import { Person } from '../types';
import { normalize } from './stringManipulation';

type FilterParams = {
  query: string;
  sex: string;
  centuries: string[];
};

export const getFilteredPeople = (people: Person[], params: FilterParams) => {
  const { query, sex, centuries } = params;

  let peopleCopy = [...people];

  if (query) {
    peopleCopy = peopleCopy.filter(person => {
      const normalizedQuery = normalize(query);

      return (
        normalize(person.name).includes(normalizedQuery) ||
        normalize(person.fatherName ?? '-').includes(normalizedQuery) ||
        normalize(person.motherName ?? '-').includes(normalizedQuery)
      );
    });
  }

  if (sex) {
    peopleCopy = peopleCopy.filter(person => person.sex === sex);
  }

  if (centuries.length !== 0) {
    peopleCopy = peopleCopy.filter(person => {
      const centurie = Math.ceil(person.born / 100);

      return centuries.includes(String(centurie));
    });
  }

  return peopleCopy;
};
