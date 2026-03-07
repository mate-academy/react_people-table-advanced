import React, { useContext, useEffect, useMemo, useState } from 'react';

import { useSearchParamsContext } from './SearchParamsContext';

import { getPeople } from '../services/api';
import { getPreparedPeople } from '../services/getPreparedPeople';

import type { Person } from '../types';
import { PeopleSearchParams } from '../types/PeopleSearchParams';

type PeopleContextType = {
  visiblePeople: Person[];
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PeopleContext = React.createContext<PeopleContextType | null>(
  null,
);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const searchParams: PeopleSearchParams = useSearchParamsContext();

  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    return getPreparedPeople(people || [], searchParams);
  }, [people, searchParams]);

  const value = useMemo(
    () => ({
      visiblePeople,
      error,
      setError,
      loading,
      setLoading,
    }),
    [visiblePeople, error, loading],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeople must be used within PeopleProvider');
  }

  return context;
};
