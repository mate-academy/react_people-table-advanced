import React, { useState, useEffect, useMemo } from 'react';
import { getPeople } from '../../api/people';

type GlobalContext = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export const PeopleContext = React.createContext<GlobalContext>({
  people: [],
  setPeople: () => {},
});

export const PeopleProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      await getPeople()
        .then(setPeople);
    };

    fetchPeople();
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
