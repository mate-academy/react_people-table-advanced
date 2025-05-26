import React, { createContext } from 'react';
import { Person } from '../types';

type PeopleContextType = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  setPeople: () => {},
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
});
