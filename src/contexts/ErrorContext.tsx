import React, { useMemo, useState } from 'react';

type ErrorContextType = {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const ErrorContext = React.createContext<ErrorContextType>({
  errorMessage: '',
  setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const value = useMemo(
    () => ({
      errorMessage,
      setErrorMessage,
    }),
    [errorMessage],
  );

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
