import React, { useMemo, useState } from 'react';
import { Person } from '../types';

interface Props {
  people: Person[] | null;
  errorMassage: boolean;
  setPeople: (value: Person[] | null) => void;
  setErrorMassage: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  loading: boolean;
  query: string;
  setQuery: (value: string) => void;
}

export const PeopleContex = React.createContext<Props>({
  people: null,
  setPeople: () => {},
  setErrorMassage: () => {},
  errorMassage: false,
  setLoading: () => {},
  loading: false,
  query: '',
  setQuery: () => {},
});

type Prop = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Prop> = ({ children }) => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMassage, setErrorMassage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const value = useMemo(
    () => ({
      people,
      errorMassage,
      loading,
      setErrorMassage,
      setLoading,
      setPeople,
      setQuery,
      query,
    }),

    [people, errorMassage, loading, query],
  );

  return (
    <PeopleContex.Provider value={value}>{children}</PeopleContex.Provider>
  );
};
