import React, { useMemo, useState } from 'react';

import { Person } from './types';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  loader: boolean;
  people: Person[];
  current: Person | null;
  warning: string;
  centuriesArray: string[] | null;
  setWarning: (warn: string) => void;
  setPeople: (value: Person[]) => void;
  setCurrent: (value: Person | null) => void;
  setLoader: (value: boolean) => void;
  setCenturiesArray: (value: string[] | null) => void;
};

export const PeopleContext = React.createContext<ContextType>({
  loader: false,
  people: [],
  current: null,
  warning: '',
  centuriesArray: [],
  setWarning: () => {},
  setPeople: () => {},
  setCurrent: () => {},
  setLoader: () => {},
  setCenturiesArray: () => {},
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [warning, setWarning] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [current, setCurrent] = useState<Person | null>(null);
  const [centuriesArray, setCenturiesArray] = useState<string[] | null>([]);

  const value = useMemo(
    () => ({
      loader,
      people,
      current,
      warning,
      centuriesArray,
      setWarning,
      setPeople,
      setCurrent,
      setLoader,
      setCenturiesArray,
    }),
    [people, current, loader, warning, centuriesArray],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
