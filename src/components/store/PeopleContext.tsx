import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { PeopleContextValue } from '../../types/ContextValues';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { useSearchParams } from 'react-router-dom';

export const PeopleContext = createContext<PeopleContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const order = searchParams.get('order');

  function sortPeople(peopleToSort: Person[]): Person[] {
    return [...peopleToSort].sort((a, b) => {
      const sorting = (first: Person, second: Person): number => {
        switch (sort) {
          case 'name':
          case 'sex':
            return first[sort].localeCompare(second[sort]);
          case 'born':
          case 'died':
            return +first[sort] - +second[sort];
          default:
            return 0;
        }
      };

      return order === 'desc' ? sorting(b, a) : sorting(a, b);
    });
  }

  function getFilterBySex(person: Person) {
    if (!sex) {
      return true;
    }

    return person.sex === sex;
  }

  function getFilterByQuery(person: Person) {
    if (!query) {
      return true;
    }

    const trimmedQuery = query.toLowerCase();

    return (
      person.name.toLocaleLowerCase().includes(trimmedQuery) ||
      person.fatherName?.toLocaleLowerCase().includes(trimmedQuery) ||
      person.motherName?.toLocaleLowerCase().includes(trimmedQuery)
    );
  }

  function getFilterByCentury(person: Person) {
    if (centuries.length === 0) {
      return true;
    }

    return centuries.includes(Math.ceil(person.born / 100).toString());
  }

  const getFilteredPeople = () => {
    return sortPeople(
      people.filter(
        person =>
          getFilterByQuery(person) &&
          getFilterByCentury(person) &&
          getFilterBySex(person),
      ),
    );
  };

  const filteredPeople = getFilteredPeople();

  const fetchPeople = useCallback(async () => {
    setIsloading(true);

    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsloading(false);
    }
  }, []);

  const peopleValue = useMemo(
    () => ({
      people: filteredPeople,
      isLoading,
      isError,
      fetchPeople,
    }),
    [filteredPeople, isLoading, isError, fetchPeople],
  );

  return (
    <PeopleContext.Provider value={peopleValue}>
      {children}
    </PeopleContext.Provider>
  );
};

export const useValues = () => {
  const value = useContext(PeopleContext);

  if (!value) {
    throw new Error('Something is wrong with provider PeopleContext');
  }

  return value;
};
