import { Person } from '../types';
import { SortKeys } from '../types/SortKeys';

export const getPeopleSorted = (
  peopleToSort: Person[], sortBy: SortKeys, order: string,
) => {
  const sortedPeople = [...peopleToSort];
  const ord = order ? -1 : 1;

  return sortedPeople.sort((a, b) => {
    if (typeof a[sortBy] === 'string') {
      return (a[sortBy] as string)
        .localeCompare(b[sortBy] as string) * ord;
    }

    if (typeof a[sortBy] === 'number') {
      return +(a[sortBy] ?? 0) - +(b[sortBy] ?? 0) * ord;
    }

    return 0;
  });
};
