import { Person } from '.';

export interface PersonLinkProps {
  person: Person;
  onSelect: (slug: string) => void;
}
