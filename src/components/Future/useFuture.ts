/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export enum FutureState {
  Pending,
  Ready,
  Error,
}

export type FutureValue<T> = {
  value: T;
  setImmediately: (value: T) => void;
  state: FutureState;
  error?: unknown;
};

export function useFuture<T>(
  promise: () => Promise<T>,
  deps: React.DependencyList,
): FutureValue<T> {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [state, setState] = useState(FutureState.Pending);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    async function update() {
      setState(FutureState.Pending);

      try {
        setValue(await promise());
        setState(FutureState.Ready);
      } catch (e) {
        setError(e);
        setState(FutureState.Error);
      }
    }

    update();
  }, deps);

  return {
    get value() {
      return value as T;
    },
    setImmediately: (newValue: T) => {
      setValue(newValue);
      setState(FutureState.Ready);
    },
    state,
    error,
  };
}
