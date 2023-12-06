import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Context } from '../types/Context';
import { Person } from '../types';

const State: Context = {
  people: [],
  setPeople: () => {},
  filteredPeople: [],
  setFilteredPeople: () => {},
  sortedPeople: [],
  setSortedPeople: () => {},
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
};

export const GlobalContext = React.createContext<Context>(State);

type Props = {
  children: React.ReactNode
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const value = {
    people,
    setPeople,
    filteredPeople,
    setFilteredPeople,
    searchParams,
    setSearchParams,
    sortedPeople,
    setSortedPeople,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
