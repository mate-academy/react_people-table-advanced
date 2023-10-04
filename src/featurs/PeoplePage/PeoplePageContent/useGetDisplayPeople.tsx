import { useSearchParams } from 'react-router-dom';
import { Person } from '../../../types';

export const useGetDisplayPeople = (
  people: Person[],
) => {
  const [searchParams] = useSearchParams();
  const resultArray = [...people];

  if (!searchParams.get('sort')) {
    return resultArray;
  }

  resultArray.sort((a, b) => {
    if (searchParams.get('sort') === 'name') {
      return a.name.localeCompare(b.name);
    }

    if (searchParams.get('sort') === 'sex') {
      return a.sex.localeCompare(b.sex);
    }

    if (searchParams.get('sort') === 'born') {
      return a.born > b.born ? 1 : -1;
    }

    if (searchParams.get('sort') === 'died') {
      return a.born > b.born ? 1 : -1;
    }

    return 0;
  });

  if (searchParams.get('order') === 'desc') {
    resultArray.reverse();
  }

  return resultArray;
};
