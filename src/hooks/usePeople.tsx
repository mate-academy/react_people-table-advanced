import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getPeopleFromServer() {
    setIsLoading(true);
    setError(null);

    try {
      const arrayOfPeople = await getPeople();

      setPeople(arrayOfPeople);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return {
    people,
    isLoading,
    error,
  };
};
