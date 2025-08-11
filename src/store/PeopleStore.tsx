import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  isPeopleLoading: true,
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setErrorMessage('');
        const fetchPerson = await getPeople();

        setPeople(fetchPerson);
      } catch (error) {
        setErrorMessage('Something going wrong');
        throw error;
      } finally {
        setIsPeopleLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, isPeopleLoading, errorMessage }}>
      {children}
    </PeopleContext.Provider>
  );
};
