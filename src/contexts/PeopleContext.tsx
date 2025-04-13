import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorType } from '../types/Error';

type PeopleContextType = {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  isLoading: false,
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType>(
    ErrorType.NO_ERROR,
  );

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();
      const preparedPeople = peopleFromServer.map((person, _, arr) => ({
        ...person,
        father: arr.find(innerPerson => innerPerson.name === person.fatherName),
        mother: arr.find(innerPerson => innerPerson.name === person.motherName),
      }));

      setPeople(preparedPeople);
    } catch {
      setErrorMessage(ErrorType.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, isLoading, errorMessage }}>
      {children}
    </PeopleContext.Provider>
  );
};
