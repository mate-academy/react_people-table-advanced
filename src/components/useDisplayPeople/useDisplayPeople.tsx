import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

export const useDisplayPeople = (people: Person[]): Person[] => {
  const [searchParams] = useSearchParams();

  const displayPeople = useMemo(() => {
    const queryFilter = searchParams.get('query')?.toLowerCase();
    const sexFilter = searchParams.get('sex') || '';
    const centuriesFilter = searchParams.getAll('centuries') || [];
    const sortOrder = searchParams.get('sortOrder');
    const sortBy = searchParams.get('sort');

    let filteredPeople = [...people];

    if (queryFilter) {
      filteredPeople = filteredPeople.filter(
        (person) => person.name.toLowerCase().includes(queryFilter)
          || person.sex.toLowerCase().includes(queryFilter),
      );
    }

    if (sexFilter) {
      filteredPeople = filteredPeople.filter(
        (person) => person.sex === sexFilter,
      );
    }

    if (centuriesFilter.length > 0) {
      filteredPeople = filteredPeople.filter((person) => {
        return centuriesFilter.includes(
          Math.ceil(Number(person.born) / 100).toString(),
        );
      });
    }

    if (sortBy === 'name') {
      filteredPeople.sort((a, b) => {
        if (sortOrder === 'ASC') {
          return a.name.localeCompare(b.name);
        }

        return b.name.localeCompare(a.name);
      });
    } else if (sortBy === 'sex') {
      filteredPeople.sort((a, b) => {
        if (sortOrder === 'ASC') {
          return a.sex.localeCompare(b.sex);
        }

        return b.sex.localeCompare(a.sex);
      });
    } else if (sortBy === 'born') {
      filteredPeople.sort((a, b) => {
        if (sortOrder === 'ASC') {
          return a.born - b.born;
        }

        return b.born - a.born;
      });
    } else if (sortBy === 'died') {
      filteredPeople.sort((a, b) => {
        if (sortOrder === 'ASC') {
          return a.born - b.born;
        }

        return b.born - a.born;
      });
    }

    return filteredPeople;
  }, [people, searchParams]);

  return displayPeople;
};
