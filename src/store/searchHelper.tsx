import React from 'react';
import { createContext } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

type Param = string | number;

type Params = {
  [key: string]: Param | Param[] | null;
};

type SearchParamsType = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  getSearchWith: (params: Params, searchParam?: URLSearchParams) => string;
};

export const SearchParamsContext = createContext<SearchParamsType>({
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
  getSearchWith: () => '',
});

export const SearchParamsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchWith = (params: Params, searchParam?: URLSearchParams) => {
    const newParams = new URLSearchParams(searchParam);

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(param => newParams.append(key, param.toString()));
      } else {
        newParams.set(key, value.toString());
      }
    }

    return newParams.toString();
  };

  return (
    <SearchParamsContext.Provider
      value={{
        searchParams,
        setSearchParams,
        getSearchWith,
      }}
    >
      {children}
    </SearchParamsContext.Provider>
  );
};
