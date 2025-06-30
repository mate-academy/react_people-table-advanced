import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Person } from '../types';
import { SexFilterType } from '../types/FilterTypes';
import { SortType } from '../types/SortTypes';
import { filterAndSortPeople } from '../utils/filterAndSortPeople';

export const useFilteredAndSortedPeople = (people: Person[] | null) => {
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const rawOrder = searchParams.get('order');
  const order = rawOrder === 'asc' || rawOrder === 'desc' ? rawOrder : null;

  const visiblePeople = useMemo(() => {
    if (!people) {
      return [];
    }

    return filterAndSortPeople(
      people,
      sex as SexFilterType,
      centuries,
      query,
      sort as SortType,
      order,
    );
  }, [people, sex, centuries, query, sort, order]);

  return { visiblePeople };
};
