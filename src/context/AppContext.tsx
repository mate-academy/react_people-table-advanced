import { createContext, ReactNode, useEffect, useState } from 'react';
import { Person } from '../types';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';

type MainContext = {
  people: Person[] | null;
  setPeople: (value: Person[] | null) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  isError: boolean;
  setIsError: (val: boolean) => void;
  searchParams: URLSearchParams;
  setSearchParams: (value: URLSearchParams) => void;
};

export const AppContext = createContext({} as MainContext);

type AppProvider = {
  children: ReactNode;
};

export const MainAppProvider: React.FC<AppProvider> = ({ children }) => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation().pathname;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (location.startsWith('/people') && people === null) {
      (async () => {
        setIsLoading(true);

        try {
          const list = await getPeople();

          setPeople(list);
          setIsLoading(false);
          setIsError(false);
        } catch {
          setIsLoading(false);
          setIsError(true);
        }
      })();
    }
  }, [location, people]);

  return (
    <AppContext.Provider
      value={{
        people,
        isLoading,
        isError,
        searchParams,
        setPeople,
        setIsLoading,
        setIsError,
        setSearchParams,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
