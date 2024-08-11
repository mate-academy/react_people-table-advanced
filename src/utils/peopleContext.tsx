import React, { useState, ReactNode } from 'react';
import { Person } from '../types';

type PersonContextType = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export const PeopleContext = React.createContext<PersonContextType>({
  people: [],
  setPeople: () => {},
});

type PeopleProviderProps = {
  children: ReactNode;
};

export const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};
