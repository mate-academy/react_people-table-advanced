import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const useFetchPeople = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const data = await getPeople();

      setPeople(data);
      setIsLoading(false);
    } catch (e) {
      setError('Something went wrong');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return {
    fetchPeople,
    people,
    setPeople,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
};
