import { useEffect, useState } from 'react';
import { Person } from '../types/Person';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function useFetch(url: string) {
  const [people, setPeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!url) {
      return;
    }

    wait(500)
      .then(() => fetch(url))
      .then(response => response.json())
      .then(setPeople)
      .then(() => setIsLoading(false))
      .catch(() => setErrorMessage('Something went wrong'));
  }, [url]);

  return {
    isLoading,
    people,
    errorMessage,
  };
}
