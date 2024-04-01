import { Person } from '../types';

export const sortPeopleBy = (
  people: Person[],
  sortParam: string,
  orderParam: string,
) => {
  const sortedVisiblePeople = [...people];

  if (sortParam) {
    sortedVisiblePeople.sort((a: Person, b: Person) => {
      const aValue = a[sortParam as keyof Person];
      const bValue = b[sortParam as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return 0;
    });

    if (orderParam) {
      sortedVisiblePeople.reverse();
    }
  }

  return sortedVisiblePeople;
};
