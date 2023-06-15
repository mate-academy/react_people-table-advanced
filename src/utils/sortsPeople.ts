import { Person } from '../types/Person';

export const sortsPeople = (
  people: Person[],
  sort: string,
  order: string,
) => {
  const prePeoples = people.sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].localeCompare(b[sort]);
      case 'born':
      case 'died':
        return a[sort] - b[sort];
      default:
        return 0;
    }
  });

  return order ? prePeoples.reverse() : prePeoples;
};
