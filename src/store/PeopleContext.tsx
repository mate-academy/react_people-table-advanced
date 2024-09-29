import React, { createContext, useMemo, useState } from 'react';
import { Person } from '../types';
type InitialContext = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  displayedPeople: Person[];
  setDisplayedPeople: React.Dispatch<React.SetStateAction<Person[]>>;
};
export const PeopleContext = createContext<InitialContext>({
  people: [],
  setPeople: () => {},
  displayedPeople: [],
  setDisplayedPeople: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [displayedPeople, setDisplayedPeople] = useState<Person[]>([]);
  const value = useMemo(() => {
    return { people, setPeople, displayedPeople, setDisplayedPeople };
  }, [people, displayedPeople]);

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
