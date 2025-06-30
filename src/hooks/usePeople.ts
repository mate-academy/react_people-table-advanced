import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setErrorMessage(false);
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setErrorMessage(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return {
    people,
    isLoading,
    errorMessage,
  };
};
