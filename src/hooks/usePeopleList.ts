import { useEffect, useState } from 'react';
import { Person } from '../types';
import { ErrorMessage } from '../types/ErrorMessage';
import { getPeople } from '../api';

export const usePeopleList = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        if (data.length === 0) {
          setErrorMessage(ErrorMessage.NoPeopleOnServer);
        } else {
          setPeopleList(data);
        }
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.Unknown);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { peopleList, errorMessage, isLoading };
};
