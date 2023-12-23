import React, {
  createContext, useContext, useState, ReactNode,
} from 'react';
import { Person } from '../../types';

interface PeopleContextProps {
  isLoading: boolean;
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>;

  people: Person[];
  setPeople:React.Dispatch<React.SetStateAction<Person[]>>;

  searchByName:string;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;

  filteredPeople: Person[];
  setFilteredPeople: React.Dispatch<React.SetStateAction<Person[]>>;

  errorMessage: string | null;
  setError:React.Dispatch<React.SetStateAction<string | null>>;

  isMotherInArray: (name: string | null) => boolean;
  isFatherInArray: (name: string | null) => boolean;

  isSorting: boolean | null;
  isFiltering: boolean | null;

  setIsSorting: React.Dispatch<React.SetStateAction<boolean | null>>;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const PeopleContext = createContext<PeopleContextProps | undefined>(undefined);

interface PeopleProviderProps {
  children: ReactNode;
}

export const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchByName, setSearchByName] = useState<string>('');

  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setError] = useState<string | null>(null);

  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean | null>(null);
  const [isSorting, setIsSorting] = useState<boolean | null>(null);

  const isMotherInArray = (name: string | null): boolean => {
    return name ? people.map((p) => p.name).includes(name) : false;
  };

  const isFatherInArray = (name: string | null): boolean => {
    return name ? people.map((p) => p.name).includes(name) : false;
  };

  const contextValue: PeopleContextProps = {
    isLoading,
    people,
    errorMessage,
    isMotherInArray,
    isFatherInArray,
    filteredPeople,
    setFilteredPeople,
    searchByName,
    setSearchByName,
    isSorting,
    isFiltering,
    setIsSorting,
    setIsFiltering,
    setIsLoading,
    setPeople,
    setError,
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeopleContext = (): PeopleContextProps => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeopleContext must be used within a PeopleProvider');
  }

  return context;
};
