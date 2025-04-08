import { createContext, FC } from 'react';

export const PeopleTableContext = createContext({});

interface Props {
  children: React.ReactNode;
}

export const PeopleTableProvider: FC<Props> = ({ children }) => {
  const value = {};

  return (
    <PeopleTableContext.Provider value={value}>
      {children}
    </PeopleTableContext.Provider>
  );
};
