import React, { createContext, useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';

type Context = {
  people: Person[]
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsPageActive: React.Dispatch<React.SetStateAction<boolean>>
  error: string | null
};

type Props = {
  children: React.ReactNode
};

const initialTabContext: Context = {
  people: [],
  isLoading: false,
  setIsLoading: () => { },
  setIsPageActive: () => { },
  error: null,
};

export const PeopleContext = createContext<Context>(initialTabContext);

export const PeopleContent: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageActive, setIsPageActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(usersFromServer => {
        setPeople(usersFromServer);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isPageActive]);

  return (
    <PeopleContext.Provider value={{
      people,
      isLoading,
      setIsLoading,
      setIsPageActive,
      error,
    }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
