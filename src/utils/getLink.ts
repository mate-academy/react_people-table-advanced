import { Person } from '../types';

export const getLink = (people: Person[], current: string, sex: string) => {
  const found = people.find(
    person => person.sex === sex && person.name === current,
  );

  return found;
};
