import React, { createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FiltersContextProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined,
);

type FiltersProviderProps = {
  children: React.ReactNode;
};

const FiltersProvider: React.FC<FiltersProviderProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value: FiltersContextProps = useMemo(
    () => ({
      searchParams,
      setSearchParams,
    }),
    [searchParams, setSearchParams],
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

const defaultFiltersContext: FiltersContextProps = {
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
};

const useFilters = () => {
  const context = useContext(FiltersContext);

  return context || defaultFiltersContext;
};

export { FiltersProvider, useFilters };
