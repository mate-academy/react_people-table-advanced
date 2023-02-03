import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const useSortedPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return useMemo(() => {
    const sortedPeoople = [...people];

    switch (sortBy) {
      case 'name':
      case 'sex':
        sortedPeoople.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        break;

      case 'born':
      case 'died':
        sortedPeoople.sort((a, b) => a[sortBy] - b[sortBy]);
        break;

      default:
        break;
    }

    return order === 'desc'
      ? sortedPeoople.reverse()
      : sortedPeoople;
  }, [people, sortBy, order]);
};
