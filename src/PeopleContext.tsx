import React, { useState, useMemo } from 'react';
import { Person } from './types';
import { PeopleContextType } from './types/PeopleContextType';
import { SearchParams, getSearchWith } from './utils/searchHelper';
import { useSearchParams } from 'react-router-dom';

export const PeopleContext = React.createContext<PeopleContextType>({
  persons: [],
  setPersons: () => { },
  sexFilter: 'all',
  setSexFilter: () => { },
  handleQueryChange: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [sexFilter, setSexFilter] = useState<string>('all');

  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params)
    console.log(search)
    setSearchParams(search)
  }


  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
    searchParams.set('query', event.target.value)
  }

  const value = useMemo(() => ({
    persons,
    setPersons,
    sexFilter,
    setSexFilter,
    handleQueryChange,
  }), [persons, sexFilter]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
