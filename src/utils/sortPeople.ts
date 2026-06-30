import { Person } from '../types';

export const sortPeople = (
  people: Person[],
  sortField: keyof Person,
  ordered: boolean,
) => {
  const filteredArray = [...people];

  return filteredArray.sort((a, b) => {
    const valueA = a[sortField] ?? '';
    const valueB = b[sortField] ?? '';

    if (valueA < valueB) {
      return ordered ? 1 : -1;
    }

    if (valueA > valueB) {
      return ordered ? -1 : 1;
    }

    return 0;
  });
};
