import { useMemo } from 'react';
import { Person } from '../types/Person';

export const useFilter = (
  people: Person[],
  query: string,
  sex: string | null,
  centuries: number[],
) => {
  const filteredPeople = useMemo(() => {
    let result = people;

    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      result = people.filter(
        person =>
          person.name.toLowerCase().includes(lowerCaseQuery) ||
          person.motherName?.toLowerCase().includes(lowerCaseQuery) ||
          person.fatherName?.toLowerCase().includes(lowerCaseQuery),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(Math.ceil(person.born / 100)),
      );
    }

    return result;
  }, [people, query, sex, centuries]);

  return filteredPeople;
};
