import { Person } from '../types';

export const getLink = (people: Person[], current: string, sex: string) => {
  const filtered = people.filter(
    person => person.sex === sex && person.name === current,
  );

  return filtered[0];
};
