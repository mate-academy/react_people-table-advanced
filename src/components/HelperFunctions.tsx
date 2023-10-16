import { Person } from '../types';
import { SortField } from '../types/SortField';

export const normalizeName = (name: string | null) => {
  return name?.toLowerCase();
};

const CENTURY_DURATION = 100;

const findIfCenturyIncluded = (
  person: Person,
  centuries: string[],
) => {
  const { born, died } = person;

  return centuries
    .includes(Math.ceil(born / CENTURY_DURATION).toString())
    || centuries.includes(Math.ceil(died / CENTURY_DURATION).toString());
};

const includesNormalizedQuery = (person: Person, normalizedQuery: string) => {
  return (
    normalizeName(person.name)?.includes(normalizedQuery)
    || normalizeName(person.motherName)?.includes(normalizedQuery)
    || normalizeName(person.fatherName)?.includes(normalizedQuery)
  );
};

export const getfilteredPeople = (
  peopleLoaded: Person[],
  centuries: string[],
  sex: string,
  query: string,
  sortField: string,
  sortOrder: string,
) => {
  let filteredPeople = [...peopleLoaded];

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(
      (person) => findIfCenturyIncluded(person, centuries),
    );
  }

  if (sex) {
    filteredPeople = filteredPeople.filter((person) => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    filteredPeople = filteredPeople.filter(
      (person) => includesNormalizedQuery(person, normalizedQuery),
    );
  }

  if (sortField) {
    filteredPeople = filteredPeople.sort((a, b) => {
      switch (sortField) {
        case SortField.Name:
          return a.name.localeCompare(b.name);
        case SortField.Sex:
          return a.sex.localeCompare(b.sex);
        case SortField.Born:
          return a.born - b.born;
        case SortField.Died:
          return a.died - b.died;
        default:
          return 0;
      }
    });
  }

  if (sortOrder === 'desc') {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
};
