import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const useGetPeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await getPeople();

        setPeople(response);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { people, isLoading, error };
};
