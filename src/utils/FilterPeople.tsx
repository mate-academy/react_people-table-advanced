import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

export const FilterPeople = (sourcePeople: Person[] | null) => {
  const [searchParams] = useSearchParams();

  if (sourcePeople === null) {
    return null;
  }

  const sexFilter = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuriesFilter = searchParams.getAll('centuries')
    .map(century => (+century * 100));
  const sortBy = searchParams.get('sort') as keyof Person;

  let filteredPeople = [...sourcePeople];

  if (sexFilter) {
    filteredPeople = filteredPeople.filter(
      person => person.sex === sexFilter,
    );
  }

  if (query) {
    filteredPeople = filteredPeople.filter(
      person => person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuriesFilter.length) {
    filteredPeople = filteredPeople.filter(
      person => centuriesFilter.some(year => (
        year >= person.born && (year - 100) < person.born
      )),
    );
  }

  if (sortBy) {
    const isDesc = searchParams.get('order');

    filteredPeople.sort((a, b) => {
      const firstParam = isDesc ? b[sortBy] : a[sortBy];
      const secondParam = isDesc ? a[sortBy] : b[sortBy];

      if (typeof firstParam === 'string'
      && typeof secondParam === 'string') {
        return firstParam.localeCompare(secondParam);
      }

      if (typeof firstParam === 'number'
      && typeof secondParam === 'number') {
        return firstParam - secondParam;
      }

      return 0;
    });
  }

  return filteredPeople;
};
