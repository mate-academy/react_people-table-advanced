import { Person } from '../types';

export const sort = (people: Person[], searchParams: URLSearchParams) => {
  const sortBy = searchParams.get('sort') || '';
  const orderBy = searchParams.get('order') || '';

  if (!sortBy) {
    return people;
  }

  const newPeople = [...people];

  newPeople.sort((person1, person2) => {
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
    newPeople.reverse();
  }

  return newPeople;
};
