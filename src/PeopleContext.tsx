import React, { useEffect, useMemo, useState } from 'react';
import { Person } from './types';
import { getPeople } from './api';
import { ErrorMessages } from './types/ErrorMessages';
import { getPreparedPeople } from './utils/functions';

interface PeopleContextType {
  peopleList: Person[];
  isLoading: boolean;
  errorMessage: string;
}

export const PeopleContext = React.createContext<PeopleContextType>({
  peopleList: [],
  isLoading: false,
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ErrorMessages.NoError);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleFromServer) => {
        setPeopleList(getPreparedPeople(peopleFromServer));
      })
      .catch(() => {
        setErrorMessage(ErrorMessages.LoadError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = useMemo(() => ({
    peopleList,
    isLoading,
    errorMessage,
  }), [peopleList, isLoading, errorMessage]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
