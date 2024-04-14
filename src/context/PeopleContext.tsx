import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PersonType } from '../types';

interface PeopleContextType {
  people: PersonType[];
  error: string;
  isLoading: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  error: '',
  isLoading: false,
  setError: () => {},
});

interface Props {
  children: React.ReactNode;
}
export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const preparedPeople = (peopleData: PersonType[]) => {
    return peopleData.map(person => ({
      ...person,
      mother: peopleData.find(per => per.name === person.motherName),
      father: peopleData.find(per => per.name === person.fatherName),
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleData => {
        setPeople(preparedPeople(peopleData));
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    people,
    error,
    isLoading,
    setError,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
