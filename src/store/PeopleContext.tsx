import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

interface ContextProps {
  people: Person[];
  setPeople: (value: Person[]) => void;
  errorMessage: boolean;
  setErrorMessage: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  loading: boolean;
}

export const PeopleContext = React.createContext<ContextProps>({
  people: [],
  setPeople: () => {},
  setErrorMessage: () => {},
  errorMessage: false,
  setLoading: () => {},
  loading: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      people,
      errorMessage,
      loading,
      setErrorMessage,
      setLoading,
      setPeople,
    }),
    [people, errorMessage, loading],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
