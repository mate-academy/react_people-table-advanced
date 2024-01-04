import { Person } from '../types';
import { SortFields } from '../types/SortFields';

export const preparePeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const queryFilter = (
  query: string | null,
  people: Person[],
): Person[] => {
  if (!query) {
    return people;
  }

  const searchedQuery = query.toLowerCase();

  return people.filter(
    (person) => person.name.toLowerCase().includes(searchedQuery)
      || person.sex.toLowerCase().includes(searchedQuery),
  );
};

export const sexFilter = (sex: string, people: Person[]): Person[] => {
  if (!sex) {
    return people;
  }

  return people.filter((person) => person.sex === sex);
};

export const centuriesFilter = (
  centuries: string[],
  people: Person[],
): Person[] => {
  if (centuries.length === 0) {
    return people;
  }

  return people.filter((person) => centuries
    .includes(Math.ceil(Number(person.born) / 100).toString()));
};

export const sortPeople = (
  sortBy: string,
  sortOrder: string,
  people: Person[],
): Person[] => {
  const sortedPeople = [...people];

  switch (sortBy) {
    case SortFields.Name:
      sortedPeople.sort((a, b) => (sortOrder === 'ASC'
        ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
      break;
    case SortFields.Sex:
      sortedPeople.sort((a, b) => (sortOrder === 'ASC'
        ? a.sex.localeCompare(b.sex) : b.sex.localeCompare(a.sex)));
      break;
    case SortFields.Born:
    case SortFields.Died:
      sortedPeople.sort((a, b) => (sortOrder
      === 'ASC' ? a.born - b.born : b.born - a.born));
      break;
    default:
      break;
  }

  return sortedPeople;
};
