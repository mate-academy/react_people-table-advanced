import { FC, useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';
import React from 'react';
type PeoplesContextType = {
  persons: Person[];
  loading: boolean;
  errorMessage: string;
};
export const PeoplesContext = React.createContext<PeoplesContextType>({
  persons: [],
  loading: false,
  errorMessage: '',
});
type Props = {
  children: React.ReactNode;
};
export const PeoplesProvider: FC<Props> = ({ children }) => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(people => setPersons(people))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);
  const value = {
    persons,
    loading,
    errorMessage,
  };

  return (
    <PeoplesContext.Provider value={value}>{children}</PeoplesContext.Provider>
  );
};
