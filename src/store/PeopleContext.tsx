import React, { useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { preparePeopleData } from '../helpers/utils';

interface Props {
  children: React.ReactNode;
}

type PeopleContextType = {
  people: Person[];
  isError: boolean;
  isLoading: boolean;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  isError: false,
  isLoading: true,
});

export const usePeople = () => useContext(PeopleContext);

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const preparedPeople = await preparePeopleData();

        setPeople(preparedPeople);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, isError, isLoading }}>
      {children}
    </PeopleContext.Provider>
  );
};
