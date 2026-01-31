import React, { createContext, useContext, useState } from 'react';
import { Person } from '../types';

type PeopleContextType = {
  peopleFromServer: Person[];
  setPeopleFromServer: (people: Person[]) => void;
  visiblePeople: Person[];
  setVisiblePeople: (people: Person[]) => void;
};

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider
      value={{
        peopleFromServer,
        setPeopleFromServer,
        visiblePeople,
        setVisiblePeople,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeople must be used within a PeopleProvider');
  }

  return context;
};
