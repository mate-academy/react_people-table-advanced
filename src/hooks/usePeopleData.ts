import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const usePeopleData = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const loadPeoples = async () => {
      try {
        setIsLoading(true);
        const peoplesList = await getPeople();

        setPeoples(peoplesList);
        setHasError(false);
      } catch (err) {
        setHasError(true);
        setPeoples([]);
      } finally {
        setIsLoading(false);
        setIsFirstLoad(false);
      }
    };

    loadPeoples();
  }, []);

  return { peoples, isLoading, hasError, isFirstLoad };
};
