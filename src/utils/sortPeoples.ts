import { Person } from '../types';

export const sortedPeoples = (
  peoples: Person[],
  sort: string | null,
  order: boolean | null,
) => {
  const prePeoples = [...peoples].sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return order
          ? b[sort].localeCompare(a[sort])
          : a[sort].localeCompare(b[sort]);

      case 'born':
      case 'died':
        return order
          ? b[sort] - a[sort]
          : a[sort] - b[sort];

      default:
        return 0;
    }
  });

  return prePeoples;
};
