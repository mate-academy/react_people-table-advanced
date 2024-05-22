import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

interface Context {
  people: Person[];
  errorMessage: string;
  loading: boolean;
}

export const PeopleContext = React.createContext<Context>({
  people: [],
  errorMessage: '',
  loading: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('There are no people on the server'))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      people,
      loading,
      errorMessage,
    }),
    [people, loading, errorMessage],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export function usePeople() {
  const people = useContext(PeopleContext);

  return people;
}
