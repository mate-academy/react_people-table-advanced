import { Person } from '../../types';

export const sortPeople = (
  sort: keyof Person,
  order: string,
  sortedPeople: Person[],
) => {
  const sortedCopy = [...sortedPeople];

  const newOutPut = sortedCopy.sort((a: Person, b: Person) => {
    const valueA = a[sort];
    const valueB = b[sort];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    return 0;
  });

  if (sort && !order) {
    return newOutPut;
  }

  if (sort && order) {
    return newOutPut.reverse();
  }

  return newOutPut;
};
