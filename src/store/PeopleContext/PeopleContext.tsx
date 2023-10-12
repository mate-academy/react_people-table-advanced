import {
  FC,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { getPeople } from '../../api';
import { getPreparedPeople } from '../../utils/filterPeople';

interface IInitialContext {
  preparedPeople: Person[];
  isLoading: boolean;
  errorMessage: string;
}

type TPeopleContext = {
  children: ReactNode;
};

const initialContext: IInitialContext = {
  preparedPeople: [],
  isLoading: false,
  errorMessage: 'Something went wrong',
};

export const PeopleProvider = createContext(initialContext);

export const PeopleContext: FC<TPeopleContext> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const sexParam = searchParams.get('sex') ?? '';
  const queryParam = searchParams.get('query') ?? '';
  const centuriesParam = searchParams.getAll('centuries') ?? [];
  const sortBy = searchParams.get('sort') ?? '';
  const orderBy = searchParams.get('order') ?? '';

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const preparedPeople = getPreparedPeople(people, {
    sexParam,
    queryParam,
    centuriesParam,
    sortBy,
    orderBy,
  });

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
    preparedPeople,
    isLoading,
    errorMessage,
  }), [preparedPeople, isLoading, errorMessage]);

  return (
    <PeopleProvider.Provider value={initialValue}>
      {children}
    </PeopleProvider.Provider>
  );
};
