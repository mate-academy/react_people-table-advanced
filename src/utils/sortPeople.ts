import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
): Person[] => {
  const isReversed: number = order ? -1 : 1;

  return [...people].sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return (a[sort] as string).localeCompare(b[sort]) * isReversed;
      case 'born':
      case 'died':
        return (+a[sort] - +b[sort]) * isReversed;
      default:
        return 0;
    }
  });
};
