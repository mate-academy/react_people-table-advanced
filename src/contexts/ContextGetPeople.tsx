import { createContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

interface PeopleContext {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  isError: boolean;
}

export const getPeopleContext = createContext<PeopleContext>({
  people: [],
  setPeople: () => {},
  isLoading: false,
  isError: false,
});

export const GetPeopleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <getPeopleContext.Provider
      value={{ people, setPeople, isLoading, isError }}
    >
      {children}
    </getPeopleContext.Provider>
  );
};
