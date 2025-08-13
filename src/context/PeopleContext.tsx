import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { PeopleContextType } from '../types/PeopleContextType';
import { getPeople } from '../api';
import { FiltersContext } from './FiltersContext';
import { SortField } from '../types/SortField';
import { Sex } from '../types/Sex';

type Props = {
  children: React.ReactNode;
};

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  visiblePeople: [],
  setVisiblePeople: () => {},
  isLoading: false,
  setIsLoading: () => {},
  hasLoadingError: false,
  setHasLoadingError: () => {},
});

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const { query, sex, centuries, sort, order } = useContext(FiltersContext);

  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const value = {
    people,
    visiblePeople,
    setVisiblePeople,
    isLoading,
    setIsLoading,
    hasLoadingError,
    setHasLoadingError,
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setHasLoadingError(false);

        const peopleWithParents = peopleFromServer.map(person => {
          const mother = peopleFromServer.find(
            parent => parent.name === person.motherName,
          );
          const father = peopleFromServer.find(
            parent => parent.name === person.fatherName,
          );

          return { ...person, mother, father };
        });

        setPeople(peopleWithParents);
        setVisiblePeople(peopleWithParents);
      })
      .catch(() => setHasLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const processedPeople = useMemo(() => {
    let result = [...people];

    if (query.trim()) {
      result = result.filter(person => {
        const normalizedQuery = query.trim().toLowerCase();

        return (
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    if (centuries.length) {
      result = result.filter(
        person =>
          person.born &&
          centuries.includes(String(Math.ceil(person.born / 100))),
      );
    }

    if (sex !== Sex.All) {
      result = result.filter(person => person.sex === sex);
    }

    if (sort) {
      result.sort((a, b) => {
        const valA = a[sort as keyof Person];
        const valB = b[sort as keyof Person];

        if (sort === SortField.Born || sort === SortField.Died) {
          return ((valA as number) || 0) - ((valB as number) || 0);
        }

        if (sort === SortField.Name || sort === SortField.Sex) {
          return String(valA).localeCompare(String(valB));
        }

        return 0;
      });

      if (order === 'desc') {
        result.reverse();
      }
    }

    return result;
  }, [people, query, centuries, sex, sort, order]);

  useEffect(() => {
    setVisiblePeople(processedPeople);
  }, [processedPeople]);

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
