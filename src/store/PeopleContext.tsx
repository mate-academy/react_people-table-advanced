import React, { createContext, useMemo, useState } from 'react';
import { Person } from '../types';

interface Props {
  children: React.ReactNode;
}

interface PeopleState {
  people: Person[];
  setPeople: (people: Person[]) => void;
}

const PeopleContext = createContext<PeopleState>({
  people: [],
  setPeople: () => {},
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  const value = useMemo(() => {
    return { people, setPeople };
  }, [people]);

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = React.useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeople must be used within a PeopleProvider');
  }

  return context;
};
