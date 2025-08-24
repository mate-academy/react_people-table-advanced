import { useMemo } from 'react';
import { Person } from '../types';

export const useFiltAndSortPeople = (
  peoples: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  return useMemo(() => {
    const query = searchParams.get('query') || '';
    const sex = searchParams.get('sex') || '';
    const sort = searchParams.get('sort') || '';
    const order = searchParams.get('order') || 'asc';
    const centuries = searchParams.getAll('centuries');

    const filteredBySex = peoples.filter(person => {
      if (!sex) {
        return true;
      }

      return person.sex === sex;
    });

    const filteredByQuery = filteredBySex.filter(person => {
      const normalisedQuery = query.trim().toLowerCase();

      const isName = person.name.toLowerCase().includes(normalisedQuery);
      const isMother = (person.motherName ?? '')
        .toLowerCase()
        .includes(normalisedQuery);
      const isFather = (person.fatherName ?? '')
        .toLowerCase()
        .includes(normalisedQuery);

      return isName || isMother || isFather;
    });

    const filteredByCentury = filteredByQuery.filter(person => {
      if (centuries.length === 0) {
        return true;
      }

      const personCentury = Math.ceil(person.born / 100);

      return centuries.includes(String(personCentury));
    });

    if (!sort) {
      return filteredByCentury;
    }

    const sortedPeople = [...filteredByCentury].sort((a, b) => {
      const aValue = a[sort as keyof Person] ?? '';
      const bValue = b[sort as keyof Person] ?? '';

      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }

      return 0;
    });

    return sortedPeople;
  }, [peoples, searchParams]);
};
