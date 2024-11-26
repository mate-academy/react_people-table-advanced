import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { PeopleContext } from './PeopleContext';

type PeopleFilteredContextType = {
  peoplesFiltered: Person[];
  setPeoplesFiltered: React.Dispatch<React.SetStateAction<Person[]>>;
};

export const PeopleFilteredContext =
  React.createContext<PeopleFilteredContextType>({
    peoplesFiltered: [],
    setPeoplesFiltered: () => {},
  });

type Props = {
  children: React.ReactNode;
};

export const PeopleFilteredProvider: React.FC<Props> = ({ children }) => {
  const { peoples } = useContext(PeopleContext);

  const [peoplesFiltered, setPeoplesFiltered] = useState<Person[]>([]);

  useEffect(() => {
    setPeoplesFiltered(peoples);
  }, [peoples]);

  const value = useMemo(
    () => ({
      peoplesFiltered,
      setPeoplesFiltered,
    }),
    [peoplesFiltered],
  );

  return (
    <PeopleFilteredContext.Provider value={value}>
      {children}
    </PeopleFilteredContext.Provider>
  );
};
