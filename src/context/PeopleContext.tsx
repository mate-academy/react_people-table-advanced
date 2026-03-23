import React, { createContext, useMemo, useState } from 'react';
import { Person } from '../types';

interface PeopleContextType {
  people: Person[];
  setPeople: (people: Person[]) => void;
}

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  setPeople: () => {},
});

type Prop = {
  children: React.ReactNode;
};

export const PeopleProvider = ({ children }: Prop) => {
  const [people, setPeople] = useState<Person[]>([]);

  const value = useMemo(() => ({ people, setPeople }), [people]);

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
