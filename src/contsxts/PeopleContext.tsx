import React, { useMemo, useState } from 'react';
import { Person } from '../types';

type PeopleContextType = {
  peoples: Person[];
  setPeoples: React.Dispatch<React.SetStateAction<Person[]>>;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  peoples: [],
  setPeoples: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peoples, setPeoples] = useState<Person[]>([]);

  const value = useMemo(
    () => ({
      peoples,
      setPeoples,
    }),
    [peoples],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
