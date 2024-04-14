import React, { useContext, useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleError } from '../../types/enums';

interface PeopleContextType {
  people: Person[];
  errorMessage: PeopleError;
  isLoading: boolean;
}

const contextValue: PeopleContextType = {
  people: [],
  errorMessage: PeopleError.noError,
  isLoading: false,
};

export const PeopleContext =
  React.createContext<PeopleContextType>(contextValue);

interface Props {
  children: React.ReactNode;
}

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(PeopleError.noError);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const fetchedPeople = await getPeople();

        const preparedPeople = fetchedPeople.map(person => ({
          ...person,
          mother: fetchedPeople.find(per => per.name === person.motherName),
          father: fetchedPeople.find(per => per.name === person.fatherName),
        }));

        setPeople(preparedPeople);
      } catch {
        setErrorMessage(PeopleError.requestErrorDisplay);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, errorMessage, isLoading }}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('error');
  }

  return context;
};
