import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import FilterParam from '../types/Filter';
import filterPeople from '../utils/filterPeople';
import { isOrderField, isSortField } from '../types/Sort';
import sortPeople from '../utils/sortPeople';
import Person from '../types/Person';

const useFilteredPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  const sexParam = searchParams.get(FilterParam.Sex);
  const nameParam = searchParams.get(FilterParam.Name);
  const centuryParam = searchParams.getAll(FilterParam.Centuries);
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order') || null;

  const filteredPeople = useMemo(() => {
    return filterPeople({
      people,
      sexParam,
      nameParam,
      centuryParam,
    });
  }, [sexParam, nameParam, centuryParam, people]);

  return useMemo(() => {
    if (
      isSortField(sortParam) &&
      (orderParam === null || isOrderField(orderParam))
    ) {
      return sortPeople(filteredPeople, sortParam, orderParam);
    }

    return filteredPeople;
  }, [orderParam, sortParam, filteredPeople]);
};

export default useFilteredPeople;
