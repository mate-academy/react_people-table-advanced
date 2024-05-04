import React, { createContext, useState } from 'react';
import { TableContextType } from '../types/TableContextType';
import { Person } from '../types/Person';

export const TableContext = createContext<TableContextType>({
  people: [],
  setPeople: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isError: false,
  setIsError: () => {},
  isEmptyMessage: false,
  setIsEmptyMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TableContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmptyMessage, setIsEmptyMessage] = useState(false);

  return (
    <TableContext.Provider
      value={{
        people,
        setPeople,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        isEmptyMessage,
        setIsEmptyMessage,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
