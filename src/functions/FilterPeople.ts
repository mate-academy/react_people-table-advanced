import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { paramsForSearch } from '../utils/paramsForSearch';
import { filterByNames } from './FilterByNames';
import { filterBySex } from './FilterBySex';
import { filterByCenturies } from './FilterByCenturies';
import { SortParams } from '../types/sortParams';

export const FilterPeople = (people: Person[]): Person[] => {
  const [searchParams] = useSearchParams();

  const searchQuery =
    searchParams.get(paramsForSearch.Query) || paramsForSearch.None;
  const sexFilter =
    searchParams.get(paramsForSearch.Sex) || paramsForSearch.None;
  const centuryFilters = searchParams.getAll(paramsForSearch.Centuries);

  const sort = searchParams.get(paramsForSearch.Sort) || paramsForSearch.None;
  const order = searchParams.get(paramsForSearch.Order) || paramsForSearch.None;

  return useMemo(() => {
    let filteredPeople = [...people];

    const normalisedQuery = searchQuery.toLowerCase().trim();

    if (sexFilter) {
      filteredPeople = filterBySex(filteredPeople, sexFilter);
    }

    if (normalisedQuery) {
      filteredPeople = filterByNames(filteredPeople, normalisedQuery);
    }

    if (!!centuryFilters.length) {
      filteredPeople = filterByCenturies(filteredPeople, centuryFilters);
    }

    switch (sort) {
      case SortParams.NAME.toLowerCase():
        filteredPeople.sort((person1, person2) =>
          person1.name.localeCompare(person2.name),
        );
        break;

      case SortParams.SEX.toLowerCase():
        filteredPeople.sort((person1, person2) =>
          person1.sex.localeCompare(person2.sex),
        );
        break;

      case SortParams.BORN.toLowerCase():
        filteredPeople.sort((person1, person2) => person1.born - person2.born);
        break;

      case SortParams.DIED.toLowerCase():
        filteredPeople.sort((person1, person2) => person1.died - person2.died);
        break;

      default:
        break;
    }

    if (order === 'desc') {
      filteredPeople.reverse();
    }

    return filteredPeople;
  }, [people, searchQuery, centuryFilters, sexFilter, sort, order]);
};
