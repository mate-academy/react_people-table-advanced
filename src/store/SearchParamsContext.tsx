import React, { useContext, useMemo } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

import { Sex } from '../types/sex';
import type { Person } from '../types';

type SearchParamsContextType = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  query: string;
  sex: Sex | null;
  centuries: number[];
  sort: keyof Person | null;
  order: 'asc' | 'desc' | null;
};

export const SearchParamsContext =
  React.createContext<SearchParamsContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const SearchParamsProvider: React.FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const sexParam = searchParams.get('sex');
  const sex: Sex | null = Object.values(Sex).includes(sexParam as Sex)
    ? (sexParam as Sex)
    : null;

  const centuries = searchParams.getAll('centuries').map(Number);

  const sort = searchParams.get('sort') as keyof Person | null;
  const order = (searchParams.get('order') as 'asc' | 'desc' | null) || null;

  const value: SearchParamsContextType = useMemo(
    () => ({
      searchParams,
      setSearchParams,
      query,
      sex,
      centuries,
      sort,
      order,
    }),
    [searchParams, setSearchParams, query, sex, centuries, sort, order],
  );

  return (
    <SearchParamsContext.Provider value={value}>
      {children}
    </SearchParamsContext.Provider>
  );
};

export const useSearchParamsContext = () => {
  const context = useContext(SearchParamsContext);

  if (!context) {
    throw new Error(
      'useSearchParamsContext must be used within SearchParamsProvider',
    );
  }

  return context;
};
