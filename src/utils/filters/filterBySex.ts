import { Person } from '../../types';

export const filterBySex = (people: Person[], sex: string | null) => {
  if (!sex || sex === 'all') {
    return people;
  }

  return people.filter(person => person.sex === sex);
};
