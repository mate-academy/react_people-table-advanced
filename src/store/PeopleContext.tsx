import React, { useContext, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

type PeopleContextValues = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  isError: boolean;
};

export const PeopleContext = React.createContext({} as PeopleContextValues);

type Props = {
  children: React.ReactNode;
};

const getPreparedPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(({ name }) => name === person.motherName),
      father: people.find(({ name }) => name === person.fatherName),
    };
  });
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = () => {
      setTimeout(async () => {
        try {
          const peopleFromServer = await getPeople();

          setPeople(getPreparedPeople(peopleFromServer));
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }, 3000);
    };

    fetchData();
  }, []);

  return (
    <PeopleContext.Provider value={{
      people,
      setPeople,
      isLoading,
      isError,
    }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export function usePeople() {
  const people = useContext(PeopleContext);

  return people;
}
