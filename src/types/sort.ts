import { SORT_BY } from '../components/conststans/sorts';

export type SortBy = (typeof SORT_BY)[number] | null;
export type SortOrder = 'asc' | 'desc' | 'none';
