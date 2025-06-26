import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';

export const usePeopleList = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(data => {
        if (!data.length) {
          setErrorMessage(ErrorMessage.NoPeopleOnServer);
        } else {
          setPeopleList(data);
        }
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.LoadingFailed);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { peopleList, errorMessage, isLoading };
};
