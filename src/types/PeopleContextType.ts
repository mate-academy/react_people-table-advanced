import { Person } from '.';

export type PeopleContextType = {
  people: Person[];
  visiblePeople: Person[];
  setVisiblePeople: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hasLoadingError: boolean;
  setHasLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
};
