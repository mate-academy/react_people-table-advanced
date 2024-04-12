import React, { Dispatch, SetStateAction } from 'react';
import { Person } from './Person';

export interface TableContextType {
  people: Person[];
  setPeople: Dispatch<SetStateAction<Person[]>>;
  isError: boolean;
  setIsError: (error: boolean) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
