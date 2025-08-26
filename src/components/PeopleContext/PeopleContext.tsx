import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';

type PersonContextType = {
  people: Person[];
  loading: boolean;
  error: boolean;
};

const PersonContext = createContext<PersonContextType>({
  people: [],
  loading: false,
  error: false,
});

export const PersonProvider = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PersonContext.Provider value={{ people, loading, error }}>
      {children}
    </PersonContext.Provider>
  );
};

export const usePersons = () => useContext(PersonContext);
