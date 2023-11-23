import { Person } from '.';

export type PeopleTableProps = {
  filteredPeople: Person[];
  selectedPersonSlug: string;
  handleSelectPerson: (slug: string) => void;
};
