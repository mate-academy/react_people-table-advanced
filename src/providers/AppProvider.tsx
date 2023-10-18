import {
  PropsWithChildren, useContext, useState, createContext,
} from 'react';
import { Person } from '../types';

type Props = PropsWithChildren<{}>;

type PeopleContextType = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
};

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const AppProvider = ({ children }: Props) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PeopleContext.Provider value={{
      people,
      setPeople,
      isLoading,
      setIsLoading,
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
