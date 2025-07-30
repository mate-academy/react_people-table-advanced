// src/context/PeopleContext.tsx
import { createContext, useContext } from 'react';
import { Person } from '../types';

type PeopleContextType = {
  peoples?: Person[];
  isLoading: boolean;
  peopleLoadingError: string;
  query: string;
  setQuery: (query: string) => void;
  sex: string;
  setSex: (sex: string) => void;
  centuries: number[];
  setCenturies: (centuries: number[]) => void;
};

export const PeopleContext = createContext<PeopleContextType | null>(null);

export const usePeopleContext = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeopleContext must be used within PeopleProvider');
  }

  return context;
};
