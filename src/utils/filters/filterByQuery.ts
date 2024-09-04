import { Person } from '../../types';

export const filterByQuery = (people: Person[], query: string): Person[] => {
  if (!query) {
    return people;
  }

  return people.filter(person => {
    const isQueryInName = person.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const isQueryInMotherName =
      person.motherName &&
      person.motherName.toLowerCase().includes(query.toLowerCase());
    const isQueryInFatherName =
      person.fatherName &&
      person.fatherName.toLowerCase().includes(query.toLowerCase());

    return isQueryInName || isQueryInMotherName || isQueryInFatherName;
  });
};
