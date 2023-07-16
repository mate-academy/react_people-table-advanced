import {
  FC,
  useEffect,
  useState,
  createContext,
} from 'react';
import { getPeople } from '../../api';
import {
  prepareData,
} from '../../utils/Helper';
import { Person } from '../../types';

interface Context {
  people: Person[],
  isLoading: boolean,
  hasError: boolean
}

const initialContext: Context = {
  people: [],
  isLoading: true,
  hasError: false,
};

export const peopleContext = createContext<Context>(initialContext);

type Props = {
  children: React.ReactNode;
};

export const ContextProvider: FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      getPeople().then(prepareData)
        .then(setPeople)
        .finally(() => setIsLoading(false));
    } catch {
      setHasError(true);
      throw Error('Error');
    }
  }, []);

  return (
    <peopleContext.Provider value={{ people, isLoading, hasError }}>
      {children}
    </peopleContext.Provider>
  );
};
