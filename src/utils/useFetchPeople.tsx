import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { ErrorMessage } from './constants';

export const useFetchPeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage(ErrorMessage.FETCH_ERROR);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { people, isLoading, errorMessage };
};
