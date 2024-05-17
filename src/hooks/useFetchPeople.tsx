import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { ERROR_MESSAGE } from '../constants';

export const useFetchPeople = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(people => {
        setPeopleData(people);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMessage(ERROR_MESSAGE);
      });
  }, []);

  return { peopleData, errorMessage, isLoading };
};
