import { Person } from '../../types';

export const filterByQuery = (people: Person[], query: string): Person[] => {
  if (!query) {
    return people;
  }

  return people.filter(
    person =>
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      (person.motherName &&
        person.motherName.toLowerCase().includes(query.toLowerCase())) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().includes(query.toLowerCase())),
  );
};
