import React, { ReactNode, useContext } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

type FilterContextType = {
  query: string | '';
  centuries: string[];
  sexs: string[];
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  sort: string | '';
  order: string | '';
  getSearchWith: (params: Params, search?: string | URLSearchParams) => string;
  setSearchWith: (params: Params) => void;
  getNextSortOrder: (
    currentSort: string | '',
    currentOrder: string | '',
    field: string | '',
  ) => {
    sort: string | null;
    order: string | null;
  };
};

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

export const FilterContext = React.createContext<FilterContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sexs = searchParams.getAll('sexs') || [];
  const centuries = searchParams.getAll('centuries') || [];

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function getSearchWith(params: Params, search?: string | URLSearchParams) {
    const newParams = new URLSearchParams(search);

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(item => newParams.append(key, item.toString()));
      } else {
        newParams.set(key, value.toString());
      }
    }

    return newParams.toString();
  }

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const getNextSortOrder = (
    currentSort: string | '',
    currentOrder: string | '',
    field: string | '',
  ) => {
    if (currentSort !== field) {
      return { sort: field, order: 'asc' };
    }

    if (currentOrder === 'asc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const value = {
    query,
    centuries,
    sexs,
    searchParams,
    setSearchParams,
    getSearchWith,
    setSearchWith,
    getNextSortOrder,
    sort,
    order,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('usePeopleContext must be used within a FilterProvider');
  }

  return context;
};
