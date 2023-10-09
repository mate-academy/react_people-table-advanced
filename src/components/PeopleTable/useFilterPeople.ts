import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

export const useFilterPeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  const queryFilter = searchParams.get('query')?.toLocaleLowerCase();
  const sexFilter = searchParams.get('sex');
  const centuriesFilter = searchParams.getAll('centuries');

  const filterPeople = people.filter((person) => {
    if (sexFilter && person.sex !== sexFilter) {
      return false;
    }

    if (queryFilter
      && !person.name.toLowerCase().includes(queryFilter)
      && !person.motherName?.toLowerCase().includes(queryFilter)
      && !person.fatherName?.toLowerCase().includes(queryFilter)
    ) {
      return false;
    }

    if (centuriesFilter.length > 0
      && !centuriesFilter.includes(Math.ceil(person.born / 100).toString())) {
      return false;
    }

    return true;
  });

  return filterPeople;
};
