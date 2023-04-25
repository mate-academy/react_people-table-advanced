import React from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

interface ContextValue {
  searchParams: URLSearchParams,
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?: {
      replace?: boolean | undefined;
      state?: any,
    } | undefined) => void
}

export const SearchParamsContext = React.createContext<ContextValue>({
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const SearchParamsProvider: React.FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const contextValue = {
    searchParams,
    setSearchParams,
  };

  return (
    <SearchParamsContext.Provider value={contextValue}>
      {children}
    </SearchParamsContext.Provider>
  );
};
