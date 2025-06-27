import React, { createContext, ReactNode } from 'react';
import { Person } from '../types/Person';

interface PeopleContextType {
  peopleLookup: Map<string, Person>;
}

export const PeopleContext = createContext<PeopleContextType | undefined>(
  undefined,
);

interface PeopleProviderProps {
  children: ReactNode;
  peopleLookup: Map<string, Person>;
}

export const PeopleProvider: React.FC<PeopleProviderProps> = ({
  children,
  peopleLookup,
}) => {
  const value = { peopleLookup };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
