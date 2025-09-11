import React, { useCallback, useMemo, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  isLoading: false,
  error: false,
  loadPeople: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      try {
        const data = await getPeople();
        const res = [];

        for (const person of data) {
          person.mother = data.find(p => p.name === person.motherName);
          person.father = data.find(p_1 => p_1.name === person.fatherName);
          res.push(person);
        }

        setPeople(data);
      } catch {
        return setError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      people,
      isLoading,
      error,
      loadPeople,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [people, isLoading, error],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
