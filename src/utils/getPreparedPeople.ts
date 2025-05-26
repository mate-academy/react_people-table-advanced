import { Person } from '../types';
import { SortFields } from '../types/sortField';

type FilteredSettings = {
  query?: string;
  sex: string | null;
  centuries?: string[];
};

export const getFilteredPeople = (
  people: Person[],
  filterSettings: FilteredSettings,
) => {
  let filteredPeople = [...people];

  Object.entries(filterSettings).forEach(([key, value]) => {
    if (value) {
      switch (key) {
        case 'query':
          if (typeof value === 'string') {
            filteredPeople = filteredPeople.filter(
              person =>
                person.name.toLowerCase().includes(value.toLowerCase()) ||
                person.fatherName
                  ?.toLocaleLowerCase()
                  .includes(value.toLowerCase()) ||
                person.motherName
                  ?.toLocaleLowerCase()
                  .includes(value.toLowerCase()),
            );
          }

          break;

        case 'sex':
          if (typeof value === 'string') {
            if (value === 'all') {
              break;
            }

            filteredPeople = filteredPeople.filter(
              person => person.sex === value,
            );
          }

          break;

        case 'centuries':
          if (typeof value === 'object') {
            const centuriesAsnumber = value.map(Number);

            if (value.length === 0) {
              break;
            }

            filteredPeople = filteredPeople.filter(person =>
              centuriesAsnumber.includes(Math.ceil(person.born / 100)),
            );
          }

          break;

        default:
          break;
      }
    }
  });

  return filteredPeople;
};

export const sortPeople = (
  people: Person[],
  sortField: SortFields | null,
  sortOrder: string | null,
) => {
  if (!sortField) {
    return people;
  }

  return [...people].sort((person1, person2) => {
    switch (sortField) {
      case SortFields.Name:
      case SortFields.Sex:
        return sortOrder
          ? person2[sortField].localeCompare(person1[sortField])
          : person1[sortField].localeCompare(person2[sortField]);
      case SortFields.Born:
      case SortFields.Died:
        return sortOrder
          ? person2[sortField] - person1[sortField]
          : person1[sortField] - person2[sortField];
    }
  });
};
