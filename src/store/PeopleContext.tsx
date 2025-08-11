import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useFilters } from './FilterContext';

type PeopleContextType = {
  isLoading: boolean;
  errorMsg: string;
  filteredPeople: Person[];
};

export const PeopleContext = React.createContext<PeopleContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { query, sexs, centuries, sort, order } = useFilters();

  const filteredPeople = useMemo(() => {
    let preparedPeople = [...people];

    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      preparedPeople = preparedPeople.filter(person =>
        person.name.toLowerCase().includes(lowerCaseQuery),
      );
    }

    if (sexs.length > 0) {
      preparedPeople = preparedPeople.filter(person =>
        sexs.includes(person.sex),
      );
    }

    if (centuries.length > 0) {
      preparedPeople = preparedPeople.filter(person => {
        const personCentury = Math.ceil(person.born / 100);

        return centuries.includes(personCentury.toString());
      });
    }

    if (sort) {
      preparedPeople.sort((a, b) => {
        const valueA = a[sort as keyof Person];
        const valueB = b[sort as keyof Person];

        if (valueA === null || valueB === null) {
          return 0;
        }

        if (valueA && valueB && valueA < valueB) {
          return order === 'desc' ? 1 : -1;
        }

        if (valueA && valueB && valueA > valueB) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return preparedPeople;
  }, [people, query, sexs, centuries, sort, order]);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      setErrorMsg('');
      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch {
        setErrorMsg('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const value = {
    isLoading,
    errorMsg,
    filteredPeople,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeopleContext must be used within a PeopleProvider');
  }

  return context;
};
