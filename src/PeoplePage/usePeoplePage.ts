import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { getPeople } from '../api';
import { FilterBySex, SortOption } from './types';

const getPreparedPeople = (
  people: Person[],
  filterBySex: FilterBySex,
  filterByQuery: string,
  filterByCenturies: string[],
  sortParam: SortOption,
  sortOrderParam: string | null,
) => {
  let preparingPeople = [...people];

  if (filterBySex) {
    preparingPeople = preparingPeople.filter(person => {
      switch (filterBySex) {
        case 'f':
          return person.sex === 'f';
        case 'm':
          return person.sex === 'm';
        default:
          return person;
      }
    });
  }

  if (filterByQuery) {
    preparingPeople = preparingPeople.filter(person => {
      return person.name.toLowerCase().includes(filterByQuery.toLowerCase());
    });
  }

  if (!!filterByCenturies.length) {
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

  return sortOrderParam ? preparingPeople.reverse() : preparingPeople;
};

export const usePeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const filterBySex = searchParams.get('sex') || null;
  const filterByQuery = searchParams.get('query') || '';
  const filterByCenturies = searchParams.getAll('centuries') || [];

  const sortParam = searchParams.get('sort') || null;
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

    if (sortParam !== value) {
      return { sort: value, order: null };
    }

    return { sort: null, order: null }; //?
  };

  const fetchPeople = async () => {
    try {
      setIsError(false);
      const peopleFromServer = await getPeople();
      const peopleWithParents = peopleFromServer.map(person => {
        return {
          ...person,
          mother: peopleFromServer.find(personToFind => {
            return person.motherName === personToFind.name;
          }),
          father: peopleFromServer.find(personToFind => {
            return person.fatherName === personToFind.name;
          }),
        };
      });

      setPeople(peopleWithParents);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const toggleCenturies = (century: string) => {
    if (filterByCenturies.includes(century)) {
      return filterByCenturies.filter(fCentury => fCentury !== century);
    }

    return [...filterByCenturies, century];
  };

  const peopleWithParams = getPreparedPeople(
    people,
    filterBySex as FilterBySex,
    filterByQuery,
    filterByCenturies,
    sortParam as SortOption,
    sortOrderParam,
  );

  useEffect(() => {
    fetchPeople();
  }, []);

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
  };
};
