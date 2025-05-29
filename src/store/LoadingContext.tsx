/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from 'react';

export const LoadingContext = createContext({
  isLoading: false,
  setLoading: (_loading: boolean) => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
