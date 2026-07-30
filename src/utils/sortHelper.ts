import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  sortBy: keyof Person,
  order: string | null,
): Person[] => {
  return [...people].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (valA === valB) {
      return 0;
    }

    if (valA === null || valA === undefined) {
      return 1;
    }

    if (valB === null || valB === undefined) {
      return -1;
    }

    let comparison = 0;

    if (typeof valA === 'string' && typeof valB === 'string') {
      comparison = valA.localeCompare(valB);
    } else {
      comparison = valA < valB ? -1 : 1;
    }

    return order === 'desc' ? -comparison : comparison;
  });
};
