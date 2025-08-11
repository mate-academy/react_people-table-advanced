import { Person } from '../types';

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
    sortedPeople.sort((people1, people2) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return people1[sort].localeCompare(people2[sort]);
        case 'born':
        case 'died':
          return people1[sort] - people2[sort];
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
