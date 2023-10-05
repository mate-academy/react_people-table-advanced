import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { PeoplePageContextType, Props } from './types';
import { Person } from '../../../types';
import { getPeople } from '../../../api';

const PeoplePageContext
= createContext<PeoplePageContextType | undefined>(undefined);

export const PeoplePageProvider = ({ children }: Props) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PeoplePageContext.Provider
      value={{
        people,
        isLoading,
        error,
      }}
    >
      {children}
    </PeoplePageContext.Provider>
  );
};

export const usePeoplePageContext = () => {
  const context = useContext(PeoplePageContext);

  if (!context) {
    // eslint-disable-next-line max-len
    throw new Error('usePeoplePageContext must be used within a PeoplePageProvider');
  }

  return context;
};
