import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';

type ContextPeople = {
  people: Person[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
};

export const PeopleContext = createContext<ContextPeople>({
  people: [],
  isLoading: false,
  isError: false,
  isEmpty: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const location = useLocation();

  const shouldReload = useMemo(() => {
    return location.pathname.startsWith('/people');
  }, [location.pathname]);

  const getPeopleFromServer = useCallback(async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setIsEmpty(true);
      }

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, [getPeopleFromServer, shouldReload]);

  const value = useMemo(() => ({
    people,
    isLoading,
    isError,
    isEmpty,
  }), [people, isLoading, isError, isEmpty]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
