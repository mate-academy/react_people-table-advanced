import { Person } from '../types';
import { getPeople } from '../api';
import { useState, useEffect } from 'react';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loadPeople() {
    try {
      setIsLoading(true);
      const data = await getPeople();

      setPeople(data);
    } catch (err) {
      setError(`error happened:${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPeople();
  }, []);

  return { people, error, isLoading };
};
