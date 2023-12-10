import React, { useState, useMemo } from 'react';
import { Person } from './types';
import { PeopleContextType } from './types/PeopleContextType';

export const PeopleContext = React.createContext<PeopleContextType>({
  persons: [],
  setPersons: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [persons, setPersons] = useState<Person[]>([]);

  const value = useMemo(() => ({
    persons,
    setPersons,
  }), [persons]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
