import { Person } from '../types';

export const sortPeopleBy = (
  people: Person[],
  sortParam: string,
  orderParam: string,
) => {
  const sortedPeople = [...people];

  if (sortParam) {
    sortedPeople.sort((a: Person, b: Person) => {
      const valueA = a[sortParam as keyof Person];
      const valueB = b[sortParam as keyof Person];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });

    if (orderParam) {
      sortedPeople.reverse();
    }
  }

  return sortedPeople;
};
