import { Person } from '../types/Types';

export const getSortedPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  if (!sort && !order) {
    return people;
  }

  const sortedPeople = [...people];

  if (sort) {
    sortedPeople.sort((item1, item2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return item1[sort].localeCompare(item2[sort]);

        case 'born':
        case 'died':
          return item1[sort] - item2[sort];

        default:
          return 0;
      }
    });
  }

  if (order) {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
