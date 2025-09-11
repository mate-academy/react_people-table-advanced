import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../utils/fetchClient';
import { ErrorMessage } from '../types/ErrorMessage';

type PeopleContextType = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  loading: boolean;
  error: string | null;
};

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setError(ErrorMessage.peopleLoadingError);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const value = useMemo(
    () => ({ people, setPeople, loading, error }),
    [people, setPeople, loading, error],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeople must be used within a PeopleProvider');
  }

  return context;
};
