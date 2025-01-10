import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
) => {
  if (!sort) {
    return people;
  }

  const sortedPeople = [...people];

  switch (sort) {
    case 'name':
      sortedPeople.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
      );
      break;

    case 'born':
    case 'died':
      sortedPeople.sort((a, b) => (a[sort] | 0) - (b[sort] || 0));
      break;

    case 'sex':
      sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex));
      break;
  }

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
