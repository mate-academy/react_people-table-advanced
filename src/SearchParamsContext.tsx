import { createContext, useContext, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchParamsContextProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

const SearchParamsContext = createContext<SearchParamsContextProps
  | undefined>(undefined);

export const useSearchParamsContext = () => {
  const context = useContext(SearchParamsContext);

  if (!context) {
    throw new
      Error('useSearchParamsContext must be used within a SearchParamsProvider');
  }

  return context;
};

interface SearchParamsProviderProps {
  children: ReactNode;
}

export const SearchParamsProvider: React.FC<SearchParamsProviderProps> = ({
  children,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <SearchParamsContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchParamsContext.Provider>
  );
};
