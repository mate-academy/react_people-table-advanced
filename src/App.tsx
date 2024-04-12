import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import { createContext, useState } from 'react';
import { TableContextType } from './types/TableContextType';
import { Person } from './types/Person';

export const TableContext = createContext<TableContextType>({
  people: [],
  setPeople: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isError: false,
  setIsError: () => {},
});

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <TableContext.Provider
      value={{
        people,
        setPeople,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
      }}
    >
      <div data-cy="app">
        <Navbar />

        <div className="section">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </TableContext.Provider>
  );
};
