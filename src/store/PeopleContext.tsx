import { createContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = createContext({
  people: [] as Person[],
  isLoading: false,
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        const updatedPeople = peopleFromServer.map(person => {
          const mother = peopleFromServer.find(
            p => p.name === person.motherName,
          );
          const father = peopleFromServer.find(
            p => p.name === person.fatherName,
          );

          return { ...person, mother, father };
        });

        setPeople(updatedPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const values = {
    people,
    isLoading,
    errorMessage,
  };

  return (
    <PeopleContext.Provider value={values}>{children}</PeopleContext.Provider>
  );
};
