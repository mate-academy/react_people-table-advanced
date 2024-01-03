import { useEffect, useState } from 'react';

// eslint-disable-next-line
export const useRequest = <T,>(
  getSomeArray: () => Promise<T[]>,
  deps: unknown[] = [],
): [T[], boolean, boolean] => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    getSomeArray()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, deps);

  return [data, isLoading, error];
};
