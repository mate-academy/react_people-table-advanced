import React, { useEffect, useState } from 'react';
import { Person } from '../../Types/Person';
import { getPeople } from '../../api/people';

type ContextProps = {
  people: Person[]
  setPeople: (items: Person[]) => void,
};

export const PeopleContext = React.createContext<ContextProps>({
  people: [],
  setPeople: () => {},
});

export const PeopleProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer));
  }, []);

  const contextValue = {
    people,
    setPeople,
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};
