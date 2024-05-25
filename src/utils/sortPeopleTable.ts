import { Person } from '../types';
type SortOrder = 'asc' | 'desc' | 'none';

export const sortPeople = (
  people: Person[],
  sortConfig: {
    key: keyof Person;
    order: SortOrder;
  },
) => {
  const sortedPeople = [...people].sort((a, b) => {
    if (sortConfig.order === 'none') {
      return 0;
    }

    const aKey = a[sortConfig.key] ?? '';
    const bKey = b[sortConfig.key] ?? '';

    if (aKey < bKey) {
      return sortConfig.order === 'asc' ? -1 : 1;
    }

    if (aKey > bKey) {
      return sortConfig.order === 'asc' ? 1 : -1;
    }

    return 0;
  });

  return sortedPeople;
};
