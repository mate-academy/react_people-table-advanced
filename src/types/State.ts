import { Person } from './Person';

export type State = {
  people: Person[] | [];
  hasError: boolean;
  isLoading: boolean;
};
