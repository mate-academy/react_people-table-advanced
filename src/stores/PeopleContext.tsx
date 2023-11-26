import React, { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Context } from '../types/Context';
import { Filter } from '../types/Filter';
import { filterPeople } from '../utils/filterPeople';

const initState: Context = {
  people: [] as Person[],
  isLoading: false,
  loadingError: false,
  filterPeople: () => [],
};

type Props = {
  children: React.ReactNode;
};

export const PeopleContext = React.createContext(initState);

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const state: Context = {
    people,
    isLoading,
    loadingError,
    filterPeople: (filters: Filter) => filterPeople(people, filters),
  };

  return (
    <PeopleContext.Provider value={state}>
      {children}
    </PeopleContext.Provider>
  );
};
