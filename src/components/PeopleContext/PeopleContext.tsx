import React, { useState, useEffect, useMemo } from 'react';
import { getPeople } from '../../api/getPeople';

export const PeopleContext = React.createContext<ContextType>({
  people: [],
  setPeople: () => {},
  visiblePeople: [],
  setVisiblePeople: () => {},
});

export const PeopleProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleData => {
        setPeople(peopleData);
      });
  }, []);

  const contextValue: ContextType = useMemo(() => {
    return {
      people,
      setPeople,
      visiblePeople,
      setVisiblePeople,
    };
  }, [people, visiblePeople]);

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};
