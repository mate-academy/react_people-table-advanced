import { Person } from '../types';

export const sortBy = (people: Person[], sort: string, order: string) => {
  const sortedPeople = [...people];

  if (sort) {
    sortedPeople.sort((a: Person, b: Person) => {
      const valueA = a[sort as keyof Person];
      const valueB = b[sort as keyof Person];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });

    if (order) {
      sortedPeople.reverse();
    }
  }

  return sortedPeople;
};
