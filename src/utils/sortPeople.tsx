import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  order: string | null,
  sort: string | null,
) => {
  const sortedPeople = [...people].sort((prev, cur) => {
    switch (sort) {
      case ('name'):
      case ('sex'):

        return prev[sort].localeCompare(cur[sort]);
      case ('born'):
      case ('died'):

        return prev[sort] - cur[sort];

      default:
        return 0;
    }
  });

  return order ? sortedPeople.reverse() : sortedPeople;
};
