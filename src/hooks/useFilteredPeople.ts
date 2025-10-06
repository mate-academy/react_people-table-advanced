import { useMemo } from 'react';
import { Person } from '../types';
import { useFilter } from './useFilter';
import { Filter, SortKey, SortOrder } from '../types/Filter';

export const useFilteredPeople = (people: Person[]): Person[] => {
  const filter: Filter = useFilter();

  return useMemo(() => {
    let filtered = [...people];

    if (filter.sex) {
      filtered = filtered.filter(p => p.sex === filter.sex);
    }

    const query = filter.query?.trim().toLowerCase();

    if (query) {
      filtered = filtered.filter(({ name, motherName, fatherName }) => {
        return [
          name.toLowerCase().includes(query),
          (motherName ?? '').toLowerCase().includes(query),
          (fatherName ?? '').toLowerCase().includes(query),
        ].some(Boolean);
      });
    }

    const centuries = filter.centuries ?? [];

    if (centuries.length > 0) {
      filtered = filtered.filter(p => {
        const birthCentury = Math.floor(p.born / 100) + 1;

        return centuries.includes(String(birthCentury));
      });
    }

    const sortKey: SortKey | undefined = filter.sort?.key;
    const sortOrder: SortOrder = filter.sort?.order ?? 'asc';

    if (sortKey) {
      filtered.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        let comparison: number;

        if (sortKey === 'born' || sortKey === 'died') {
          comparison = (aVal as number) - (bVal as number);
        } else {
          comparison = (aVal as string).localeCompare(
            bVal as string,
            undefined,
            { sensitivity: 'base' },
          );
        }

        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [
    people,
    filter.sex,
    filter.query,
    filter.centuries,
    filter.sort?.key,
    filter.sort?.order,
  ]);
};
