import { Person } from '../types';

export const sortByKey = (
  people: Person[],
  sortBy: keyof Person | null,
  order: 'desc' | null = null,
) => {
  const peopleToSort = [...people];

  switch (sortBy) {
    case 'name':
    case 'sex':
      peopleToSort.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
      break;
    case 'born':
    case 'died':
      peopleToSort.sort((a, b) => a[sortBy] - b[sortBy]);
      break;
    default:
      break;
  }

  if (order === 'desc') {
    peopleToSort.reverse();
  }

  return peopleToSort;
};
