import { useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import * as type from '../types';
import { getFilteredPeople } from '../utils/filter';
import { SearchParams } from '../types/SearchParams';

export const PeopleContext = React.createContext<type.PeopleContext>({
  setInitialPeople: () => { },
  setIsLoading: () => { },
  setHasError: () => { },
  initialPeople: [],
  visiblePeople: [],
  isLoading: false,
  hasError: '',
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvide: React.FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [initialPeople, setInitialPeople] = useState<type.Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');

  const query = searchParams.get(SearchParams.query) || '';
  const centuries = searchParams.getAll(SearchParams.centuries) || [];
  const sex = searchParams.get(SearchParams.sex) || '';
  const sort = searchParams.get(SearchParams.sort) || '';
  const order = searchParams.get(SearchParams.order) || '';

  const visiblePeople = getFilteredPeople(
    initialPeople,
    {
      query, centuries, sex, sort, order,
    },
  );

  const state = {
    setInitialPeople,
    setIsLoading,
    initialPeople,
    visiblePeople,
    isLoading,
    hasError,
    setHasError,
  };

  return (
    <PeopleContext.Provider value={state}>
      {children}
    </PeopleContext.Provider>
  );
};
