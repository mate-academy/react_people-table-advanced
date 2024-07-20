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
};

export type PeopleTableProps = {
  people: Person[];
};
