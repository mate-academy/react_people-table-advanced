import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { Person } from '../../types';
import { getPeople } from '../../api';

interface IInitialContext {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
}

type TPeopleContext = {
  children: ReactNode;
};

const initialContext: IInitialContext = {
  people: [],
  isLoading: false,
  errorMessage: 'Something went wrong',
};

export const PeopleProvider = createContext(initialContext);

export const PeopleContext: FC<TPeopleContext> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { pathname } = useLocation();

  const containsPeople = pathname.includes('/people');

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (!containsPeople) {
        return;
      }

      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);

        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);

        setErrorMessage('Something went wrong');
        setIsLoading(false);
      }
    })();
  }, [containsPeople]);

  const initialValue = useMemo(() => ({
    people,
    isLoading,
    errorMessage,
  }), [people, isLoading, errorMessage]);

  return (
    <PeopleProvider.Provider value={initialValue}>
      {children}
    </PeopleProvider.Provider>
  );
};
