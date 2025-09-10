import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);

      try {
        const result = await getPeople();

        setPeople(result);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return {
    people,
    isLoading,
    error,
  };
};
