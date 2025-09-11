import { Person } from '../types';
import { Filters, SortField, SortOrder } from '../types/Filters';

export const getFilters = (params: URLSearchParams): Filters => ({
  sex: params.get('sex') as Person['sex'] | undefined,
  query: params.get('query') || undefined,
  centuries: params.getAll('centuries'),
  sort: params.get('sort') as SortField | undefined,
  order: params.get('order') as SortOrder | undefined,
});
