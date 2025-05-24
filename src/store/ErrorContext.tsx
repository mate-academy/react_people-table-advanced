/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from 'react';

export const ErrorContext = createContext({
  error: false,
  setError: (_error: boolean) => {},
  noMatch: false,
  setNoMatch: (_match: boolean) => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  return (
    <ErrorContext.Provider value={{ error, setError, noMatch, setNoMatch }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
