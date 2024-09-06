import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';

export const useFetchPeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { people, isLoading, errorMessage };
};
