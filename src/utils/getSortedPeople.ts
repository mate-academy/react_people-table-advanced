import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortedPeople = people.sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].toLowerCase().localeCompare(b[sort].toLowerCase());

      case 'born':
      case 'died':
        return a[sort] - b[sort];

      default:
        return 0;
    }
  });

  return order ? sortedPeople.reverse() : sortedPeople;
};
