import React, {
  createContext, useContext, useEffect, useState, ReactNode,
} from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';

interface PeopleContextProps {
  loading: boolean;
  people: Person[];

  searchByName:string;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;

  filteredPeople: Person[];
  setFilteredPeople: React.Dispatch<React.SetStateAction<Person[]>>;

  errorMessage: string | null;
  isMotherInArray: (name: string | null) => boolean;
  isFatherInArray: (name: string | null) => boolean;
}

const PeopleContext = createContext<PeopleContextProps | undefined>(undefined);

interface PeopleProviderProps {
  children: ReactNode;
}

export const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchByName, setSearchByName] = useState('');

  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setError] = useState<string | null>(null);

  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isMotherInArray = (name: string | null): boolean => {
    return name ? people.map((p) => p.name).includes(name) : false;
  };

  const isFatherInArray = (name: string | null): boolean => {
    return name ? people.map((p) => p.name).includes(name) : false;
  };

  const contextValue: PeopleContextProps = {
    loading,
    people,
    errorMessage,
    isMotherInArray,
    isFatherInArray,
    filteredPeople,
    setFilteredPeople,
    searchByName,
    setSearchByName,
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
