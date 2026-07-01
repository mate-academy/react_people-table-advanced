import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

type Props = {
  children: React.ReactNode;
};

type PeopleContextType = {
  people: Person[];
  loading: boolean;
  error: boolean;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  loading: false,
  error: false,
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({ people, loading, error }),
    [people, loading, error],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export function usePeople() {
  return useContext(PeopleContext);
}
