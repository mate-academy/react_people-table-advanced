/* import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { useLocation } from 'react-router-dom';
import { getPeople } from '../api';

type PeopleContextType = {
  isLoading: boolean;
  people: Person[];
  pathname: string;
  errorMessage: string;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  isLoading: false,
  people: [],
  pathname: '',
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {


  const value = useMemo(
    () => ({
      people,
      isLoading,
      pathname,
      errorMessage,
    }),
    [people, isLoading, pathname, errorMessage],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
 */
