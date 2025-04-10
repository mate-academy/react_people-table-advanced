import React, { ReactNode, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export type PeopleContextType = {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
};

export const peopleContext = React.createContext<PeopleContextType>({
  people: [],
  isLoading: false,
  errorMessage: '',
});

type Props = {
  children: ReactNode;
};

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const rawPeople = await getPeople();

        const preparedPeople = rawPeople.map((person, _, arr) => ({
          ...person,
          father: arr.find(
            innerPerson => innerPerson.name === person.fatherName,
          ),
          mother: arr.find(
            innerPerson => innerPerson.name === person.motherName,
          ),
        }));

        setPeople(preparedPeople);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'An unexpected error occured during fetch',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <peopleContext.Provider value={{ people, isLoading, errorMessage }}>
      {children}
    </peopleContext.Provider>
  );
};
