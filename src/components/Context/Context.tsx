import React, { ReactNode, useContext, useState } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

interface ValuesTypes {
  peoples: Person[];
  setPeoples: React.Dispatch<React.SetStateAction<Person[]>>;
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currPeoples: Person[] | undefined;
  setCurrPeoples: React.Dispatch<React.SetStateAction<Person[] | undefined>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  query: string;
  gender: string | null;
  centuries: string[];
  sortCurr: string | null;
  order: string | null;
  centuriesArr: string[];
  necessaryPeople: Person[] | undefined;
}

const TableContext = React.createContext<ValuesTypes | undefined>(undefined);

if (!TableContext) {
  throw new Error('err');
}

// eslint-disable-next-line max-len
export const TableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [currPeoples, setCurrPeoples] = useState<Person[]
  | undefined>(undefined);

  const [hasError, setHasError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const gender = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];
  const sortCurr = searchParams.get('sort');
  const order = searchParams.get('order');

  const centuriesArr = ['16', '17', '18', '19', '20'];
  const necessaryPeople = currPeoples === undefined
    ? peoples
    : currPeoples;

  const values: ValuesTypes = {
    peoples,
    setPeoples,
    hasError,
    setHasError,
    isLoading,
    setIsLoading,
    currPeoples,
    setCurrPeoples,
    searchParams,
    setSearchParams,
    query,
    gender,
    centuries,
    sortCurr,
    order,
    centuriesArr,
    necessaryPeople,
  };

  return (
    <TableContext.Provider value={values}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = (): ValuesTypes => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('err');
  }

  return context;
};
