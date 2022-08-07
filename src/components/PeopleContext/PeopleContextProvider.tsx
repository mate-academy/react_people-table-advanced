import React, { useState, useEffect } from 'react';
import { getPeople } from '../../api/api';

type ContextProps = {
  people: Person[],
  setPeople: CallableFunction,
};

export const PeopleContext = React.createContext<ContextProps>({
  people: [],
  setPeople: () => {},
});

export const PeopleContextProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople().then(setPeople);
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
