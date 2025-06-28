import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { SortTypes } from '../types/sortTypes';
import { Person } from '../types';
import { OrderTypes } from '../types/orderTypes';

export enum Sex {
  female = 'f',
  male = 'm',
  all = '',
}

export const useFilters = (people: Person[] | null) => {
  const [searchParams] = useSearchParams();
  const sex = (searchParams.get('sex') || '') as Sex;
  const name = searchParams.get('name')?.toLowerCase().trim() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = (searchParams.get('sort') as SortTypes) || null;
  const order = (searchParams.get('order') as OrderTypes) || 'asc';
  const query = searchParams.get('query') || '';

  const filteredPeople = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    if (!people) {
      return [];
    }

    let result = [...people];

    result = result
      .filter(
        person =>
          !query ||
          person.name.toLowerCase().trim().includes(normalizedQuery) ||
          (person.fatherName ?? '')
            .toLowerCase()
            .trim()
            .includes(normalizedQuery) ||
          (person.motherName ?? '')
            .toLowerCase()
            .trim()
            .includes(normalizedQuery),
      )
      .filter(person => !sex || person.sex === sex)
      .filter(person => {
        const preparedName = person.name.toLowerCase().trim();

        return !name || preparedName.includes(name);
      })
      .filter(person => {
        if (centuries.length === 0) {
          return true;
        }

        const century = (Math.floor((person.born - 1) / 100) + 1).toString();

        return centuries.includes(century);
      });

    if (sort) {
      const reverse = order === 'asc' ? 1 : -1;

      result.sort((a, b) => {
        switch (sort) {
          case 'name':
            return a.name.localeCompare(b.name) * reverse;
          case 'sex':
            return a.sex.localeCompare(b.sex) * reverse;
          case 'born':
            return (a.born - b.born) * reverse;
          case 'died':
            return (a.died - b.died) * reverse;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [people, sex, name, centuries, sort, order, query]);

  return { sex, name, centuries, sort, order, query, filteredPeople };
};
