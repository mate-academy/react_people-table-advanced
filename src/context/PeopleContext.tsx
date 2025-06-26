/* eslint-disable prettier/prettier */
import React, { useMemo } from 'react';
import { Person } from '../types';
import { usePeople } from '../hooks/usePeople';

interface PeopleContextType {
  people: Person[] | null;
  isLoading: boolean;
  error: string | null;
}

export const PeopleContext = React.createContext<PeopleContextType>({
  people: null,
  isLoading: false,
  error: null,
});

interface Props {
  children: React.ReactNode;
}

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const { people, isLoading, error } = usePeople();

  const value = useMemo(
    () => ({
      people,
      isLoading,
      error,
    }),
    [people, isLoading, error],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
