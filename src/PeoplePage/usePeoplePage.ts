import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { getPeople } from '../api';
import { FilterBySex, SortOption } from './config/types';

interface Options {
  people: Person[];
  filterBySex: FilterBySex;
  filterByQuery: string;
  filterByCenturies: string[];
  sortParam: SortOption;
  sortOrderParam: string | null;
}

const getPreparedPeople = (options: Options) => {
  const {
    people,
    filterBySex,
    filterByQuery,
    filterByCenturies,
    sortParam,
    sortOrderParam,
  } = options;

  let preparingPeople = [...people];

  if (filterBySex) {
    preparingPeople = preparingPeople.filter(person => {
      switch (filterBySex) {
        case 'f':
          return person.sex === 'f';
        case 'm':
          return person.sex === 'm';
        default:
          return true;
      }
    });
  }

  if (filterByQuery) {
    preparingPeople = preparingPeople.filter(person =>
      person.name.toLowerCase().includes(filterByQuery.toLowerCase()),
    );
  }

  if (filterByCenturies.length > 0) {
    preparingPeople = preparingPeople.filter(person => {
      const century = Math.floor(person.born / 100) + 1;

      return filterByCenturies.includes(`${century}`);
    });
  }

  preparingPeople = preparingPeople.sort((person1, person2) => {
    switch (sortParam) {
      case SortOption.NAME:
        return person1.name.localeCompare(person2.name);
      case SortOption.SEX:
        return person1.sex.localeCompare(person2.sex);
      case SortOption.BORN:
        return person1.born - person2.born;
      case SortOption.DIED:
        return person1.died - person2.died;
      default:
        return 0;
    }
  });

  return sortOrderParam === 'desc'
    ? preparingPeople.reverse()
    : preparingPeople;
};

export const usePeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [peopleWithParams, setPeopleWithParams] = useState<Person[]>([]);

  const filterBySex = (searchParams.get('sex') || null) as FilterBySex;
  const filterByQuery = searchParams.get('query') || '';
  const filterByCenturies = useMemo(
    () => searchParams.getAll('centuries'),
    [searchParams],
  );
  const sortParam = (searchParams.get('sort') || null) as SortOption;
  const sortOrderParam = searchParams.get('order') || null;

  const setSearchWith = (params: SearchParams) => {
    const UrlSearch = getSearchWith(searchParams, params);

    setSearchParams(UrlSearch);
  };

  const getSortParam = (value: string) => {
    if (sortParam === value && sortOrderParam) {
      return { sort: null, order: null };
    }

    if (sortParam === value) {
      return { sort: value, order: 'desc' };
    }

    return { sort: value, order: null };
  };

  const fetchPeople = async () => {
    try {
      setIsError(false);
      const peopleFromServer = await getPeople();
      const peopleWithParents = peopleFromServer.map(person => ({
        ...person,
        mother: peopleFromServer.find(
          personToFind => person.motherName === personToFind.name,
        ),
        father: peopleFromServer.find(
          personToFind => person.fatherName === personToFind.name,
        ),
      }));

      setPeople(peopleWithParents);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || '' });
  };

  const toggleCenturies = (century: string) => {
    const updatedCenturies = filterByCenturies.includes(century)
      ? filterByCenturies.filter(fCentury => fCentury !== century)
      : [...filterByCenturies, century];

    setSearchWith({ centuries: updatedCenturies });
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  useEffect(() => {
    const updated = getPreparedPeople({
      people,
      filterBySex,
      filterByQuery,
      filterByCenturies,
      sortParam,
      sortOrderParam,
    });

    setPeopleWithParams(updated);
  }, [
    people,
    filterBySex,
    filterByQuery,
    filterByCenturies,
    sortParam,
    sortOrderParam,
  ]);

  return {
    people,
    isError,
    isLoading,
    peopleWithParams,
    filterBySex,
    filterByQuery,
    filterByCenturies,
    sortParam,
    sortOrderParam,
    getSortParam,
    inputOnChange,
    toggleCenturies,
    filteredPeople: peopleWithParams,
    selectedSex: filterBySex,
    searchQuery: filterByQuery,
    selectedCenturies: filterByCenturies,
    onSearchChange: inputOnChange,
    toggleCenturySelection: toggleCenturies,
  };
};
