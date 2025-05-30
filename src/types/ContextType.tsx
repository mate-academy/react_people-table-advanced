import { Person } from './Person';

export type PropsPeopleContext = {
  children: React.ReactNode;
};

export type ContextType = {
  loading: boolean;
  setLoading: (bool: boolean) => void;
  error: boolean;
  setError: (bool: boolean) => void;
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  visiblePeople: Person[];
};
