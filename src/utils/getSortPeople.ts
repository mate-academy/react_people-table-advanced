import { Person } from '../types';

export const getSortPeople = (people: Person[], params: URLSearchParams) => {
  const sortBy = params.get('sort') || '';
  const orderBy = params.get('order') || '';

  if (!sortBy) {
    return people;
  }

  const sortedPeople = structuredClone(people);

  sortedPeople.sort((person1, person2) => {
    switch (sortBy) {
      case 'born':
      case 'died':
        return person1[sortBy] - person2[sortBy];

      case 'sex':
      case 'name':
        return person1[sortBy].localeCompare(person2[sortBy]);

      default:
        return 0;
    }
  });

  if (orderBy === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
