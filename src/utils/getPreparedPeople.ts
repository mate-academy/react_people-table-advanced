import { Person } from '../types';
import { SortType } from '../types/SortType';

export function getPreparedPeople(
  peopleArr: Person[],
  sortType: SortType,
  isReversed: boolean,
) {
  const sortedPeople = [...peopleArr].sort((a, b) => {
    const valueA = a[sortType];
    const valueB = b[sortType];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    return 0;
  });

  if (isReversed) {
    sortedPeople.reverse();
  }

  return sortedPeople;
}
