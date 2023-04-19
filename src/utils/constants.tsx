import { FilterBySex } from '../types/typesFilters/FilterBySex';

export const sexOptions = [
  { value: null, label: 'All' },
  { value: FilterBySex.MAN, label: 'Male' },
  { value: FilterBySex.WOMAN, label: 'Female' },
];
