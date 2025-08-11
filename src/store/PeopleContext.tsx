import React, { useCallback, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { isPerson } from '../services/people';
import { Person } from '../types';

export const PeopeleContext = React.createContext({
  people: [] as Person[],
  loading: false,
  errorMessage: '',
  loadPeople: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPeople = useCallback(async () => {
    setLoading(true);

    try {
      const peopleFromService = await getPeople();

      setPeople(
        peopleFromService.map(person => ({
          ...person,
          mother: isPerson(peopleFromService, person.motherName),
          father: isPerson(peopleFromService, person.fatherName),
        })),
      );
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      people,
      loading,
      errorMessage,
      loadPeople,
    }),
    [people, loading, errorMessage, loadPeople],
  );

  return (
    <PeopeleContext.Provider value={value}>{children}</PeopeleContext.Provider>
  );
};
