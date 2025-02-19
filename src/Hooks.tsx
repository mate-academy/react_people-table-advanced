import React, { createContext, useContext, useState } from 'react';
import { Person } from './types';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  visiblePeople: Person[];
  setVisiblePeople: React.Dispatch<React.SetStateAction<Person[]>>;
};

const HooksContext = createContext<ContextProps | null>(null);

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  return (
    <HooksContext.Provider
      value={{
        loading,
        setLoading,
        people,
        setPeople,
        error,
        setError,
        visiblePeople,
        setVisiblePeople,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
};

export const UseHooks = (): ContextProps => {
  const context = useContext(HooksContext);

  if (!context) {
    throw new Error('Context Error');
  }

  return context;
};
