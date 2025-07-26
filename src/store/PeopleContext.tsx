import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Person, Sort } from '../types';
import { useLocation, useSearchParams } from 'react-router-dom';

type PeopleContextType = {
  people: Person[];
  isLoading: boolean;
  isError: boolean;
  isPeople: boolean;
  isPeoplePage: boolean;
  setPeople: (people: Person[]) => void;
  sortOrder: 'asc' | 'desc';
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  sortType: Sort;
  setSortType: (sortType: Sort) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
};

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  isLoading: true,
  isError: false,
  isPeople: false,
  isPeoplePage: false,
  sortType: null,
  sortOrder: 'asc',
  setPeople: () => {},
  setIsLoading: () => {},
  setIsError: () => {},
  setSortType: () => {},
  setSortOrder: () => {},
});

type PeopleProviderProps = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const isPeoplePage = useLocation().pathname.includes('/people');
  const [searchParams] = useSearchParams();

  const [sortType, setSortType] = useState<Sort>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const currentSortTypeInUrl = searchParams.get('sort') as Sort;
    const currentSortOrderInUrl =
      searchParams.get('order') === 'desc' ? 'desc' : 'asc';

    setSortType(currentSortTypeInUrl);

    if (currentSortTypeInUrl) {
      setSortOrder(currentSortOrderInUrl);
    } else {
      setSortOrder('asc');
    }
  }, [searchParams]);

  const sortedPeople = useMemo(() => {
    const newPeople = [...people];

    if (!sortType) {
      return newPeople;
    }

    newPeople.sort((a, b) => {
      let valA: string | number;
      let valB: string | number;

      switch (sortType) {
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'sex':
          valA = a.sex;
          valB = b.sex;
          break;
        case 'born':
          valA = a.born;
          valB = b.born;
          break;
        case 'died':
          valA = a.died;
          valB = b.died;
          break;
        default:
          return 0;
      }

      if (valA < valB) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (valA > valB) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return newPeople;
  }, [people, sortType, sortOrder]);

  const value = useMemo(
    () => ({
      people: sortedPeople,
      setPeople,
      isLoading,
      isError,
      isPeople: sortedPeople.length > 0,
      isPeoplePage,
      sortType,
      setIsLoading,
      setIsError,
      setSortType,
      setSortOrder,
      sortOrder,
    }),
    [sortedPeople, sortOrder, sortType, isLoading, isError, isPeoplePage],
  );

  return (
    <PeopleContext.Provider value={value as PeopleContextType}>
      {children}
    </PeopleContext.Provider>
  );
};
