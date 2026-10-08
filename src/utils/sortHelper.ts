import { Person } from '../types';
import { SortField } from '../types/SortField';

export const getSortedPeople = (
  people: Person[],
  sort: SortField | null,
  order: string | null,
) => {
  if (!sort) {
    return people;
  }

  const direction = order === null ? 1 : -1;

  return [...people].sort((a, b) => {
    const valueA = a[sort];
    const valueB = b[sort];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction * valueA.localeCompare(valueB);
    }

    return direction * ((valueA as number) - (valueB as number));
  });
};
