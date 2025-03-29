import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useLocation } from 'react-router-dom';
import { getPeople } from '../api';

export const usePeople = () => {
  const [people, setPeople] = useState<Array<Person> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.startsWith('/people') || people) {
      return;
    }

    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, [pathname, people]);

  return { people, isLoading, hasError };
};
