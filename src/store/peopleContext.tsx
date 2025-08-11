import React, { createContext, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = createContext({
  isError: false,
  getPeopleFromServer: () => {},
  isLoading: false,
  people: [] as Person[],
});

export const PeopleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getPeopleFromServer = () => {
    setIsLoading(true);
    getPeople()
      .then(res => setPeople(res))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const value = {
    people,
    getPeopleFromServer,
    isError,
    isLoading,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
