import { Person } from './Person';

export type PeopleContext = {
  setInitialPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHasError: React.Dispatch<React.SetStateAction<string>>;
  initialPeople: Person[],
  visiblePeople: Person[],
  isLoading: boolean,
  hasError: string,
};
