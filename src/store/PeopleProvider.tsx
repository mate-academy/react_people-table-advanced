import { FC, useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';
import React from 'react';
type PeoplesContextType = {
  people: Person[];
  loading: boolean;
  errorMessage: string;
};
export const PeoplesContext = React.createContext<PeoplesContextType>({
  people: [],
  loading: false,
  errorMessage: '',
});
type Props = {
  children: React.ReactNode;
};
export const PeoplesProvider: FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);
  const value = {
    people,
    loading,
    errorMessage,
  };

  return (
    <PeoplesContext.Provider value={value}>{children}</PeoplesContext.Provider>
  );
};
