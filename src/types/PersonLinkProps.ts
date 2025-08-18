import { Person } from '../types';

export interface PersonLinkProps {
  personName: string | null;
  peopleMap: Map<string, Person>;
  sex?: string;
  searchParams?: string;
}
