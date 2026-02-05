/* eslint-disable curly */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';

type PeopleContextValue = {
  people: Person[];
  loading: boolean;
  error: string | null;
};

const PeopleContext = createContext<PeopleContextValue | undefined>(undefined);

export const PeopleProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    getPeople()
      .then(data => {
        if (!mounted) return;
        setPeople(data);
      })
      .catch(err => {
        if (!mounted) return;
        setError(String(err));
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PeopleContext.Provider value={{ people, loading, error }}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = (): PeopleContextValue => {
  const ctx = useContext(PeopleContext);

  if (!ctx) {
    throw new Error('usePeople must be used within PeopleProvider');
  }

  return ctx;
};
