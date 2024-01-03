import { Person } from '../types';

export const sortPeople = (
  sourcePeople: Person[] | null,
  sortBy: keyof Person,
  sortOrder: string | null,
) => {
  if (!sourcePeople) {
    return null;
  }

  const sortedPeople = [...sourcePeople];

  sortedPeople.sort((a, b) => {
    const firstParam = sortOrder ? b[sortBy] : a[sortBy];
    const secondParam = sortOrder ? a[sortBy] : b[sortBy];

    if (typeof firstParam === 'string'
      && typeof secondParam === 'string') {
      return firstParam.localeCompare(secondParam);
    }

    if (typeof firstParam === 'number'
      && typeof secondParam === 'number') {
      return firstParam - secondParam;
    }

    return 0;
  });

  return sortedPeople;
};
