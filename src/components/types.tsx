import { Person } from '../types';

export interface SortParams {
  peopleInFunc: Person[];
  sortType: string;
  desc?: string;
}

export type PeoplePageProps = {
  people: Person[];
  error: boolean;
  loadingPeople: boolean;
  visiblePeople: Person[];
};

export type PeopleTableProps = {
  people: Person[];
};
