import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
): Person[] => {
  if (!sort) {
    return [...people];
  }

  const sortedPeople = [...people];

  switch (sort) {
    case 'name':
      sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'sex':
      sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
      break;

    case 'born':
      sortedPeople.sort((a, b) => a.born - b.born);
      break;

    case 'died':
      sortedPeople.sort((a, b) => a.died - b.died);
      break;

    default:
      break;
  }

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
