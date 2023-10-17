import { Person, SortBy, SortOrder } from '../types';

export const getSortBy = (
  people: Person[],
  sortBy: SortBy,
  sortOrder: SortOrder,
): Person[] => {
  const copyPeople = [...people];
  const sortASC = sortOrder === 'ASC' ? 1 : -1;

  if (!sortBy) {
    return people;
  }

  const person = (a: Person, b: Person): number => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);

      case 'sex':
        return a.sex.localeCompare(b.sex);

      case 'born':
        return Number(a.born) - Number(b.born);

      case 'died':
        return Number(a.died) - Number(b.died);
      default:
        return 0;
    }
  };

  return copyPeople.sort((a, b) => sortASC * person(a, b));
};
