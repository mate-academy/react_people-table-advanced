import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

export const useSortPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  const sortParams = searchParams.get('sort') as keyof Pick<
  Person, 'name' | 'born' | 'died' | 'sex'>;
  const orderParams = searchParams.get('order');

  const sortedPeople = people.sort((a, b) => {
    if (sortParams) {
      if (a[sortParams] < b[sortParams]) {
        return orderParams === 'desc' ? 1 : -1;
      }

      if (a[sortParams] > b[sortParams]) {
        return orderParams === 'desc' ? -1 : 1;
      }
    }

    return 0;
  });

  return sortedPeople;
};
