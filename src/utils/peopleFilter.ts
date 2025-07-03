import { Person } from '../types';

type SortOrder = 'asc' | 'desc';

type FilterOptions = {
  people: Person[];
  query?: string;
  sex?: string | null;
  centuries?: string[];
  sort?: keyof Person | null;
  order?: SortOrder;
};

export const filterAndSortPeople = ({
  people,
  query = '',
  sex = null,
  centuries = [],
  sort = null,
  order = 'asc',
}: FilterOptions): Person[] => {
  let result = [...people];

  if (query) {
    const q = query.toLowerCase();

    result = result.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.fatherName?.toLowerCase().includes(q) ||
        p.motherName?.toLowerCase().includes(q),
    );
  }

  if (sex) {
    result = result.filter(p => p.sex === sex);
  }

  if (centuries.length > 0) {
    result = result.filter(p => {
      const birthCentury = Math.floor(p.born / 100) + 1;

      return centuries.includes(String(birthCentury));
    });
  }

  if (sort) {
    result.sort((a, b) => {
      const aVal = a[sort];
      const bVal = b[sort];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }

  return result;
};
