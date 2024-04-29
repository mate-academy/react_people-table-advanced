import React, { useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

type PeopleContextType = {
  peopleList: Person[];
  setPeopleList: (v: Person[]) => void;
  filterBySex: string | null;
  filterByQuery: string;
  filterByCenturies: string[];
  sortBy: string;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  peopleList: [],
  setPeopleList: () => {},
  filterBySex: '',
  filterByQuery: '',
  filterByCenturies: [],
  sortBy: '',
});

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const filterBySex = searchParams.get('sex') || '';
  const filterByQuery = searchParams.get('query') || '';
  const filterByCenturies = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sortBy') || '';

  const contextValue = {
    peopleList,
    setPeopleList,
    filterBySex,
    filterByQuery,
    filterByCenturies,
    sortBy,
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};
