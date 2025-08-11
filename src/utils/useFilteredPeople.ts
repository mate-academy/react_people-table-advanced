import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { peopleContext } from '../context/PeopleContext';
import { Person } from '../types';
import { SearchNames } from './searchNames';

export const useFilteredPeople = (): Person[] => {
  const { people } = useContext(peopleContext);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get(SearchNames.Query) || SearchNames.None;
  const sexFilter = searchParams.get(SearchNames.Sex) || SearchNames.None;
  const centuryFilters = searchParams.getAll(SearchNames.Centuries);
  const sort = searchParams.get(SearchNames.Sort) || SearchNames.None;
  const order = searchParams.get(SearchNames.Order) || SearchNames.None;

  return useMemo(() => {
    let filtered = [...people];

    const normalisedQuery = searchQuery.toLowerCase().trim();

    if (normalisedQuery) {
      filtered = filtered.filter(person => {
        const names = [person.name, person.fatherName, person.motherName];

        for (const name of names) {
          if (name?.toLowerCase().includes(normalisedQuery)) {
            return true;
          }
        }

        return false;
      });
    }

    if (sexFilter) {
      filtered = filtered.filter(person => person.sex === sexFilter);
    }

    if (centuryFilters.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuryFilters.includes(century.toString());
      });
    }

    switch (sort) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'sex':
        filtered.sort((a, b) => a.sex.localeCompare(b.sex));
        break;
      case 'born':
        filtered.sort((a, b) => a.born - b.born);
        break;
      case 'died':
        filtered.sort((a, b) => a.died - b.died);
        break;
      default:
        break;
    }

    if (order === 'desc') {
      filtered.reverse();
    }

    return filtered;
  }, [people, searchQuery, centuryFilters, sexFilter, sort, order]);
};
