import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortField, SortOrder } from '../types';

type SearchFilters = {
  sex: string;
  query: string;
  centuries: string[];
  sort: SortField;
  order: SortOrder;
};

export const useSearchFilters = (): SearchFilters => {
  const [searchParams] = useSearchParams();

  return useMemo(
    () => ({
      sex: searchParams.get('sex') || '',
      query: searchParams.get('query') || '',
      centuries: searchParams.getAll('century'),
      sort: (searchParams.get('sort') as SortField) || undefined,
      order: (searchParams.get('order') as SortOrder) || 'asc',
    }),
    [searchParams],
  );
};
