import { useEffect, useState } from 'react';
import { getPeople } from '../api';

export function useFetch<T>() {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const response = (await getPeople()) as T[];

        setData(response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Something went wrong');
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, isLoading, errorMessage };
}
