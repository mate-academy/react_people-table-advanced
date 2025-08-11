import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  loading: false,
  errorMessage: '',
});

interface Props {
  children: React.ReactNode;
}

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(fetchedPeople => {
        const updatedPeople = fetchedPeople.map(person => {
          const mother = fetchedPeople.find(
            fetchPerson => fetchPerson.name === person.motherName,
          );
          const father = fetchedPeople.find(
            fetchPerson => fetchPerson.name === person.fatherName,
          );

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(updatedPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
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

export const usePeople = () => {
  const people = useContext(PeopleContext);

  return people;
};
