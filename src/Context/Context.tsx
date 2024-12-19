import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Person } from '../types/Person/Person';
import { Filter } from '../enums/Filter';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SortValues } from '../enums/SortValues';
import { getPeople } from '../api';

// #region context

interface PeopleContextType {
  searchParams: URLSearchParams;
  pathname: string;
  people: Person[];
  filteredPeople: Person[];
  activeCenturies: string[];
  loader: boolean;
  filter: Filter;
  loadingError: boolean;
  sexParam: string | null;
  sortParam: SortValues | null;
  orderParam: 'desc' | null;
  query: string;
  setFilter: (filter: Filter) => void;
  queryHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  centuriesHandler: (value: string) => void;
  resetHandler: () => void;
  sortHandler: (value: SortValues) => void;
}

export const PeopleContext = createContext<PeopleContextType>({
  searchParams: new URLSearchParams(),
  pathname: '',
  people: [],
  filteredPeople: [],
  activeCenturies: [],
  loader: false,
  filter: Filter.all,
  loadingError: false,
  sexParam: null,
  sortParam: null,
  orderParam: null,
  query: '',
  setFilter: () => {},
  queryHandler: () => {},
  centuriesHandler: () => {},
  resetHandler: () => {},
  sortHandler: () => {},
});

// #endregion

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  // #region params

  const [searchParams, setSearchParams] = useSearchParams();
  const sexParam = searchParams.get('sex');
  const queryParam = searchParams.get('query');
  const centuriesParams = searchParams.getAll('centuries');
  const sortParam = searchParams.get('sort') as SortValues | null;
  const orderParam = searchParams.get('order') as 'desc' | null;

  // #endregion
  // #region states

  const [loader, setLoader] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [filter, setFilter] = useState(Filter.all);
  const [query, setQuery] = useState(queryParam || '');
  const [activeCenturies, setActiveCenturies] =
    useState<string[]>(centuriesParams);

  // #endregion
  // #region variables

  const { pathname } = useLocation();
  const isStartWithPeop = pathname.startsWith('/people');

  const peopleByQuery = useMemo(() => {
    return people.filter(person => {
      const { name, motherName, fatherName } = person;
      const LCName = name.toLowerCase();
      const LCMotherName = motherName?.toLowerCase();
      const LCFatherName = fatherName?.toLowerCase();
      const LCQuery = query.toLowerCase();
      const isQueryIncluded =
        LCName.includes(LCQuery) ||
        LCMotherName?.includes(LCQuery) ||
        LCFatherName?.includes(LCQuery);

      if (isQueryIncluded) {
        return person;
      }

      return;
    });
  }, [people, query]);

  const peopleByCenturies = useMemo(() => {
    return peopleByQuery.filter(person => {
      const { born, died } = person;
      const bornCentury = String(born + 100).slice(0, 2);
      const diedCentury = String(died + 100).slice(0, 2);

      if (
        activeCenturies.length === 0 ||
        activeCenturies.includes(bornCentury) ||
        activeCenturies.includes(diedCentury)
      ) {
        return person;
      }

      return;
    });
  }, [peopleByQuery, activeCenturies]);

  const filteredPeople = useMemo(() => {
    const resultingList = peopleByCenturies.filter(person => {
      switch (filter) {
        case Filter.female:
          return person.sex === 'f';
        case Filter.male:
          return person.sex === 'm';
        default:
          return person;
      }
    });

    if (sortParam) {
      const sortResList = resultingList.toSorted((personA, personB) => {
        switch (sortParam) {
          case SortValues.name:
            return personA.name.localeCompare(personB.name);
          case SortValues.sex:
            return personA.sex.localeCompare(personB.sex);
          case SortValues.born:
            return personA.born - personB.born;
          case SortValues.died:
            return personA.died - personB.died;
        }
      });

      if (orderParam === 'desc') {
        return sortResList.toReversed();
      }

      return sortResList;
    }

    return resultingList;
  }, [peopleByCenturies, sortParam, filter, orderParam]);

  // #endregion
  // #region handlers

  const queryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);

    if (value.length === 0) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value);
    }

    setSearchParams(searchParams);
  };

  const centuriesHandler = (value: string) => {
    if (value.length === 0) {
      setActiveCenturies([]);
      searchParams.delete('centuries');
    } else if (activeCenturies.includes(value)) {
      setActiveCenturies(centuries =>
        centuries.filter(century => century !== value),
      );
      searchParams.delete('centuries', `${value}`);
    } else {
      setActiveCenturies(centuries => [...centuries, value]);
      searchParams.append('centuries', value);
    }

    setSearchParams(searchParams);
  };

  const resetHandler = () => {
    setActiveCenturies([]);
    setQuery('');
    searchParams.delete('centuries');
    searchParams.delete('query');
    searchParams.delete('sex');

    setSearchParams(searchParams);
  };

  const sortHandler = (value: SortValues) => {
    if (sortParam !== value) {
      searchParams.set('sort', value);

      if (orderParam === 'desc') {
        searchParams.delete('order');
      }
    }

    if (sortParam === value) {
      if (orderParam === null) {
        searchParams.set('order', 'desc');
      } else {
        searchParams.delete('order');
        searchParams.delete('sort');
      }
    }

    setSearchParams(searchParams);
  };

  // #endregion
  // #region useEffects

  useEffect(() => {
    setLoader(true);

    if (isStartWithPeop) {
      getPeople()
        .then(result => setPeople(result))
        .catch(() => setLoadingError(true))
        .finally(() => setLoader(false));
    }
  }, [isStartWithPeop]);

  // #endregion
  // #region contextValue

  const contextValue = {
    searchParams,
    pathname,
    people,
    filteredPeople,
    activeCenturies,
    loader,
    filter,
    loadingError,
    sexParam,
    sortParam,
    orderParam,
    query,
    setFilter,
    queryHandler,
    centuriesHandler,
    resetHandler,
    sortHandler,
  };

  // #endregion

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};
