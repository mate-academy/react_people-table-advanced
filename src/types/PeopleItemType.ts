import type { Person } from './Person';

export type PeopleItemType = {
  person: Person;
  people: Person[];
  warning: string;
  onWarning: (value: string) => void;
};
