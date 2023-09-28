import { SortField } from '../../../context/types';
import { Person } from '../../../types';

export const useGetDisplayPeople = (
  people: Person[],
  sortField: SortField | null,
  isReversed: boolean,
) => {
  const resultArray = [...people];

  if (!sortField) {
    return resultArray;
  }

  resultArray.sort((a, b) => {
    if (sortField === 'name') {
      return a.name.localeCompare(b.name);
    }

    if (sortField === 'sex') {
      return a.sex.localeCompare(b.sex);
    }

    if (sortField === 'born') {
      return a.born > b.born ? 1 : -1;
    }

    return 0;
  });

  if (isReversed) {
    resultArray.reverse();
  }

  return resultArray;
};
