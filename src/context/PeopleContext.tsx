import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ErrorType, Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils';

interface Context {
  people: Person[];
  errorMessage: ErrorType | null;
  setErrorMessage: (message: ErrorType | null) => void;
  loading: boolean;
}

export const PeopleContext = createContext<Context>({
  people: [],
  errorMessage: null,
  setErrorMessage: () => { },
  loading: false,
});

export const PeopleProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        if (peopleFromServer.length === 0) {
          setErrorMessage(ErrorType.DATA);

          return;
        }

        const preparedPeople = getPreparedPeople(peopleFromServer);

        setPeople(preparedPeople);
      })
      .catch(() => setErrorMessage(ErrorType.SERVER))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => {
    return {
      people,
      errorMessage,
      setErrorMessage,
      loading,
    };
  }, [people, errorMessage, loading]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
