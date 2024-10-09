import { createContext, ReactNode, useState } from 'react';
import { Person } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MyContext = createContext<any>(null);

interface MyProvideProps {
  children: ReactNode;
}

export const MyProvider = ({ children }: MyProvideProps) => {
  const [person, setPerson] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const contextValue = {
    person,
    setPerson,
    error,
    setError,
    isLoading,
    setIsLoading,
    selectedPerson,
    setSelectedPerson,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
