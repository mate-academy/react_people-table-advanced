import React, { useState, useEffect, useMemo } from 'react';
import { getPeople } from '../api/people';

type Context = {
  people: People[],
  setPeople: (people: People[]) => void,
};

export const PeopleContext = React.createContext<Context>({
  people: [],
  setPeople: () => {},
});

export const PeopleProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<People[]>([]);

  const loadPeople = async () => {
    const peoples = await getPeople();

    setPeople(peoples);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const contextValue = useMemo(() => {
    return {
      people,
      setPeople,
    };
  }, [people]);

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};
