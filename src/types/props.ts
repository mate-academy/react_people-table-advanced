import { Person } from './Person';

export interface PeopleTableProps {
  peopleList: Person[];
}

export type PersonLinkProps = {
  person?: Person;
  name?: string | null;
};
