import { useEffect, useState } from 'react';

export type Loader<T> = { value: T; isReady: boolean; isError: boolean };

export function useLoader<T>(
  promise: Promise<T>,
  initialValue: T,
  deps: React.DependencyList,
): Loader<T> {
  const [value, setValue] = useState<T>(initialValue);
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function update() {
      setIsReady(false);
      setIsError(false);

      try {
        const newValue = await promise;

        setValue(newValue);
      } catch {
        setIsError(true);
      }

      setIsReady(true);
    }

    update();
  }, deps);

  return { value, isReady, isError };
}
