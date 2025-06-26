/* eslint-disable @typescript-eslint/indent */
import { useSearchParams } from 'react-router-dom';
import { getVisiblePeople } from '../utils/getVisiblePeople';
import { SexFilterTypeValues } from '../types/FilterTypes';
import { Person } from '../types';
import { SortTypesValues } from '../types/SortTypes';

export const useFilterPeople = (people: Person[] | null) => {
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = people
    ? getVisiblePeople(
        people,
        sex as SexFilterTypeValues,
        centuries,
        query,
        sort as SortTypesValues,
        order,
      )
    : [];

  return {
    visiblePeople,
  };
};
