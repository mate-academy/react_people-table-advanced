import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
