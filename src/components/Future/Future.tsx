import { ReactNode } from 'react';
import { FutureValue, FutureState } from './useFuture';

type Props<T> = {
  future: FutureValue<T>;
  whilePending?: () => ReactNode;
  whileError?: (error: unknown) => ReactNode;
  whileReady?: (value: T) => ReactNode;
};

export function Future<T>({
  future,
  whilePending,
  whileError,
  whileReady,
}: Props<T>) {
  return (
    <>
      {(() => {
        switch (future.state) {
          case FutureState.Pending:
            return whilePending && whilePending();
          case FutureState.Error:
            return whileError && whileError(future.error);
          case FutureState.Ready:
            return whileReady && whileReady(future.value);
        }
      })()}
    </>
  );
}
