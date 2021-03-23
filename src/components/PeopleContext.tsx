import React, {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import { getPeople } from '../api/people';
import { Person } from './PersonRow';

type ContextProps = {
  people: Person[];
  setPeople: Dispatch<SetStateAction<Person[]>>;
};

const contextProps: ContextProps = {
  people: [],
  setPeople: () => {},
};

export const PeopleContext = React.createContext<ContextProps>(contextProps);

export const PeopleProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<Array<Person>>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const contextValue: ContextProps = {
    people,
    setPeople,
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};
