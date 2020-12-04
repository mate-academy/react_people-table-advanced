import React, { useState } from 'react';
import { IPerson } from '../Interfaces/Interfaces';

export const AppContext = React.createContext<{
  people: IPerson[];
  setPeople: React.Dispatch<React.SetStateAction<IPerson[]>>;
}>({
  people: [],
  setPeople: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<IPerson[]>([]);

  const AppProps = {
    people,
    setPeople,
  };

  return <AppContext.Provider value={AppProps}>{children}</AppContext.Provider>;
};
