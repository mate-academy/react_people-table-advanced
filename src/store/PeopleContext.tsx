/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from 'react';
import { Person } from '../types';

export const PeopleContext = createContext({
  peoples: [] as Person[],
  setPeoples: (_people: Person[]) => {},
});

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  const [peoples, setPeoples] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider value={{ peoples, setPeoples }}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeoples = () => useContext(PeopleContext);
