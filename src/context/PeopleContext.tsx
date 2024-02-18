import {
  Dispatch, createContext, useState, SetStateAction,
} from 'react';
import { Person } from '../types/Person';

type Props = {
  children: React.ReactNode
};

type PeopleContextType = {
  people: Person[];
  setPeople: Dispatch<SetStateAction<Person[]>>;
  selectedPerson: null | Person,
  setSelectedPerson: Dispatch<SetStateAction<Person | null>>,
};

export const PeopleContext
  = createContext<PeopleContextType>({
    people: [],
    setPeople: () => {},
    selectedPerson: null,
    setSelectedPerson: () => {},
  });

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [selectedPerson, setSelectedPerson]
    = useState<null | Person>(null);

  const value = {
    people,
    setPeople,
    selectedPerson,
    setSelectedPerson,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
