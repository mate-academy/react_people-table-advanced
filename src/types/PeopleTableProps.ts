import { Person } from '../types';

export interface PeopleTableProps {
  people: Person[];
  highlightedSlug?: string;
  peopleMap: Map<string, Person>;
}
