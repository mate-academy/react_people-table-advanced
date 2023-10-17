import {
  PropsWithChildren, useContext, useState, createContext,
} from 'react';
import { Person } from '../types';

type Props = PropsWithChildren<{}>;

type PeopleContextType = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
};

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const AppProvider = ({ children }: Props) => {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider value={{
      people,
      setPeople,
    }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeopleContext = (): PeopleContextType => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
};
