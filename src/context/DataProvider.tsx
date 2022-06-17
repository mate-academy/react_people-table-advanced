import React, { useEffect, useMemo, useState } from 'react';
import { fetchPeople } from '../api/api';
import { Person } from '../types/Person';

type ContextProps = {
  peopleList: Person[];
  setPeopleList: (people: Person[]) => void
};

export const DataContext = React.createContext({} as ContextProps);

const DataProvider: React.FC = ({ children }) => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);

  const contextValue = useMemo(() => {
    return {
      peopleList,
      setPeopleList,
    };
  }, [peopleList]);

  useEffect(() => {
    fetchPeople()
      .then(data => setPeopleList(data));
  }, []);

  return (
    <DataContext.Provider
      value={contextValue}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
