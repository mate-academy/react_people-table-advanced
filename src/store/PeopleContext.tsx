import React, { createContext, useMemo, useState } from 'react';
import { usePeopleSorting } from '../hooks/usePeopleSorting';
import { Person, Sort } from '../types';
import { useLocation } from 'react-router-dom';
import { Filter } from '../types/Filter';
import { usePeopleFiltering } from '../hooks/usePeopleFiltering';

type PeopleContextType = {
  people: Person[];
  isLoading: boolean;
  isError: boolean;
  isPeople: boolean;
  isPeoplePage: boolean;
  sortType: Sort;
  sortOrder: 'asc' | 'desc';
  filterType: Filter;
  setPeople: (people: Person[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setSortType: (sortType: Sort) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setFilterType: (filterType: Filter) => void;
};

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  isLoading: true,
  isError: false,
  isPeople: false,
  isPeoplePage: false,
  sortType: null,
  sortOrder: 'asc',
  filterType: null,
  setPeople: () => {},
  setIsLoading: () => {},
  setIsError: () => {},
  setSortType: () => {},
  setSortOrder: () => {},
  setFilterType: () => {},
});

type PeopleProviderProps = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const isPeoplePage = useLocation().pathname.includes('/people');

  const { filteredPeople } = usePeopleFiltering(people);

  const { sortType, sortOrder, setSortType, setSortOrder, sortedPeople } =
    usePeopleSorting(filteredPeople);

  const [filterType, setFilterType] = useState<Filter>(null);

  const value = useMemo(
    () => ({
      people: sortedPeople,
      isLoading,
      isError,
      isPeople: sortedPeople.length > 0,
      isPeoplePage,
      sortType,
      sortOrder,
      filterType,
      setPeople,
      setIsLoading,
      setIsError,
      setSortType,
      setSortOrder,
      setFilterType,
    }),
    [
      sortedPeople,
      sortOrder,
      sortType,
      isLoading,
      isError,
      isPeoplePage,
      filterType,
      setSortType,
      setSortOrder,
    ],
  );

  return (
    <PeopleContext.Provider value={value as PeopleContextType}>
      {children}
    </PeopleContext.Provider>
  );
};
