import { MainContentType } from './MainContentType';
import { Person } from './Person';

export interface PeopleContextType {
  people: Person[],
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>,
  mainContent: MainContentType,
  setMainContent: (context: MainContentType) => void,
}
