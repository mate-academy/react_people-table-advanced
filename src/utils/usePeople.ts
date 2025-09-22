import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const usePeople = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);

      try {
        const result = await getPeople();

        setPeopleData(result);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return {
    peopleData,
    isLoading,
    error,
  };
};
