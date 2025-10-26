import { createContext, useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

type PeopleContextType = {
  people: Person[];
  error: string | null;
  isLoading: boolean;
};

export const PeopleContext = createContext<PeopleContextType | null>(null);

export const usePeopleState = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error();
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPeople = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setError('Не удалось загрузить людей');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const value = {
    people,
    isLoading,
    error,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
