import { Person } from '../types';

export const getSortedPeople = (
  people: Person[],
  sort: string,
  order: string,
) => {
  const sortedPeoople = [...people];

  switch (sort) {
    case 'name':
      sortedPeoople.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'sex':
      sortedPeoople.sort((a, b) => a.sex.localeCompare(b.sex));
      break;

    case 'born':
      sortedPeoople.sort((a, b) => a.born - b.born);
      break;

    case 'died':
      sortedPeoople.sort((a, b) => a.died - b.died);
      break;

    default:
      break;
  }

  return order === 'desc'
    ? sortedPeoople.reverse()
    : sortedPeoople;
};
