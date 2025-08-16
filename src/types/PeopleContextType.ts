import { Person } from '../types';

export interface PeopleContextType {
  people: Person[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}
