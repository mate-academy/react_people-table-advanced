import { PeopleContextType } from '../types/PeopleContextType';
import { getPeople } from '../api';
import { createContext, useEffect, useState } from 'react';
import { PeopleProviderProps } from '../types';
import { Person } from '../types';
import React from 'react';

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  loading: true,
  error: null,
  refresh: () => {},
});

export const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = () => {
    setLoading(true);
    setError(null);
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <PeopleContext.Provider
      value={{ people, loading, error, refresh: fetchPeople }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
