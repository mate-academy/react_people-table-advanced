import React, { useState } from 'react';
import { Person } from '../types';
import { PeopleContext } from './PeopleContext';

type PeopleProviderProps = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        errorMessage,
        setErrorMessage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
