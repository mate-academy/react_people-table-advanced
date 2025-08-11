import React, { useMemo, useState } from 'react';
import { Person } from '../types';

type PeopleContextType = {
  people: Person[];
  setPeople: (people: Person[]) => void;
  filteredPeople: Person[];
  setFilteredPeople: (todos: Person[]) => void;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  setPeople: () => {},
  filteredPeople: [],
  setFilteredPeople: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const value = useMemo(
    () => ({
      people,
      setPeople,
      filteredPeople,
      setFilteredPeople,
    }),
    [people, filteredPeople],
  );

  // prettier-ignore
  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
