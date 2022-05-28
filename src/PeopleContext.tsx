import React, { useEffect, useMemo, useState } from 'react';
import { getPeople } from './people';
import { Man } from './types';

type ContextProps = {
  people: Man[],
  setPeople: (people: Man[]) => void,
};

export const PeopleContext = React.createContext<ContextProps>({
  people: [],
  setPeople: () => { },
});

export const PeopleProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<Man[]>([]);

  const contextValue = useMemo(() => {
    return {
      people,
      setPeople,
    };
  }, [people]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};
