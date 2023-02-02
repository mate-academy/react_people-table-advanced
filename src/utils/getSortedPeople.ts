import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sort: string,
  order: string,
) => {
  const sortedPeoople = [...people];

  switch (sort) {
    case 'name':
    case 'sex':
      sortedPeoople.sort((a, b) => a[sort].localeCompare(b[sort]));
      break;

    case 'born':
    case 'died':
      sortedPeoople.sort((a, b) => a[sort] - b[sort]);
      break;

    default:
      break;
  }

  return order === 'desc'
    ? sortedPeoople.reverse()
    : sortedPeoople;
};
