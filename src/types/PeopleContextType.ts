import { ChangeEvent } from 'react';
import { Person } from './Person';

export interface PeopleContextType {
  persons: Person[];
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
  sexFilter: string;
  setSexFilter: React.Dispatch<React.SetStateAction<string>>;
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
