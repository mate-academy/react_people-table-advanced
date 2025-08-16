import { Person } from '../types';

export interface PersonLinkProps {
  personName: string | null;
  peopleMap: Map<string, Person>;
  onClick?: (slug: string) => void;
  sex?: string;
}
