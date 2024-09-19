import { Person } from '../types';

interface FindRelativeProps {
  searchName: string | null;
  people: Person[];
}

export const findRelative = ({ searchName, people }: FindRelativeProps) => {
  return people.find(({ name }) => name === searchName) || null;
};
