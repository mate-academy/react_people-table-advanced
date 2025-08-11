import { useCallback, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadPeople = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      const peopleFromServer = await getPeople();
      const peopleMap = new Map(
        peopleFromServer.map(person => [person.name, person]),
      );
      const peopleWithParents = peopleFromServer.map(person => ({
        ...person,
        mother: person.motherName ? peopleMap.get(person.motherName) : null,
        father: person.fatherName ? peopleMap.get(person.fatherName) : null,
      }));

      setPeople(peopleWithParents);
    } catch (err) {
      setError(true);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  return {
    people,
    isLoading,
    error,
  };
};
