import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortFields } from '../types/SortFields';
import {
  queryFilter, sortPeople, sexFilter, centuriesFilter,
} from './helpers';

export function usePeopleToDisplay(people: Person[]): Person[] {
  const [searchParams] = useSearchParams();

  const searchQueryFiltering = queryFilter(
    searchParams.get(SortFields.Query),
    sexFilter(
      searchParams.get(SortFields.Sex) || '',
      centuriesFilter(searchParams.getAll(SortFields.Centuries) || [], people),
    ),
  );

  const sortOrder = searchParams.get('sortOrder') || '';
  const sortBy = searchParams.get('sort') || '';
  const filteredAndSortedPeople
      = sortPeople(sortBy, sortOrder, searchQueryFiltering);

  return useMemo(() => filteredAndSortedPeople, [filteredAndSortedPeople]);
}
