import { Person } from './Person';

export interface PeopleContextType {
  persons: Person[];
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
}
