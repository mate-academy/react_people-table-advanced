import React, { useState, useEffect, useMemo } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';

type GlobalContext = {
  people: Person[];
  setPeople: (people: Person[]) => void;
  loading: boolean,
  error: boolean
};

export const PeopleContext = React.createContext<GlobalContext>({
  people: [],
  setPeople: () => {},
  loading: false,
  error: false,
});

export const PeopleProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchPeople = async () => {
      await getPeople()
        .then(setPeople)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    };

    fetchPeople();
  }, []);

  const contextValue = useMemo(() => {
    return {
      people,
      setPeople,
      loading,
      error,
    };
  }, [people, loading, error]);

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};
