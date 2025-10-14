import React, { createContext, useCallback, useContext, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

interface PeopleContextType {
  people: Person[];
  loading: boolean;
  error: string | null;
  loadPeople: () => Promise<void>;
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeople must be used inside PeopleProvider');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPeople = useCallback(async () => {
    if (people.length > 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getPeople();

      setPeople(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [people.length]);

  const value = { people, loading, error, loadPeople };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
