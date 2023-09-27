import { createContext, useState } from 'react';
import { Person } from '../../types';

type PeopleContextType = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

const DEFAULT_PEOPLE_CONTEXT: PeopleContextType = {
  people: [],
  setPeople: () => { },
};

export const PeopleContext = createContext(DEFAULT_PEOPLE_CONTEXT);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};
