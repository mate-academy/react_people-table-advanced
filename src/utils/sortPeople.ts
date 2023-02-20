import { Person } from '../types';

export const SortPeople = (
  peopleToSort: Person[],
  sortField: string | null,
  order: string | null,
) => {
  if (sortField) {
    peopleToSort.sort((person1, person2) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return person1[sortField].localeCompare(person2[sortField]);

        case 'born':
        case 'died':
          return Number(person1[sortField]) - Number(person2[sortField]);

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    peopleToSort.reverse();
  }

  return peopleToSort;
};
