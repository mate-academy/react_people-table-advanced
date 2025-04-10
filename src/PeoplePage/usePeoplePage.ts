import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { getPeople } from '../api';
import { FilterBySex, SortOption } from './types';

interface Options {
  people: Person[];
  filterBySex: FilterBySex | null;
  filterByQuery: string;
  filterByCenturies: string[];
  sortParam: SortOption | null;
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
        case FilterBySex.FEMALE:
          return person.sex === FilterBySex.FEMALE;
        case FilterBySex.MALE:
          return person.sex === FilterBySex.MALE;
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
      const century = Math.floor((person.born - 1) / 100) + 1;

      return filterByCenturies.includes(`${century}`);
    });
  }

  if (sortParam) {
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
  }

  return sortOrderParam ? preparingPeople.reverse() : preparingPeople;
};

export const usePeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const filterBySex = searchParams.get('sex') as FilterBySex | null;
  const filterByQuery = searchParams.get('query') || '';
  const filterByCenturies = searchParams.getAll('centuries') || [];

  const sortParam = searchParams.get('sort') as SortOption | null;
  const sortOrderParam = searchParams.get('order');

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

    return { sort: null, order: null };
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

  const peopleWithParams = getPreparedPeople({
    people,
    filterBySex,
    filterByQuery,
    filterByCenturies,
    sortParam,
    sortOrderParam,
  });

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
