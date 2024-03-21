import { Person } from '../types';
import { SortFields } from '../types/SortFields';

interface FilterSettings {
  query?: string;
  sex?: string;
  centuries?: number[];
}
export const filterPeople = (
  people: Person[],
  filterSettings: FilterSettings,
) => {
  let filteredPeople = [...people];

  Object.entries(filterSettings).forEach(([key, value]) => {
    if (value) {
      switch (key) {
        case 'query':
          filteredPeople = filteredPeople.filter(
            person =>
              person.name.toLowerCase().includes(value.toLowerCase()) ||
              person.fatherName?.toLowerCase().includes(value.toLowerCase()) ||
              person.motherName?.toLowerCase().includes(value.toLowerCase()),
          );
          break;

        case 'sex':
          if (value === 'all') {
            break;
          }

          filteredPeople = filteredPeople.filter(
            person => person.sex === value,
          );
          break;

        case 'centuries':
          if (!value.length) {
            break;
          }

          filteredPeople = filteredPeople.filter(person =>
            value.includes(`${Math.ceil(person.born / 100)}`),
          );
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
      case SortFields.Died:
      case SortFields.Born:
        return sortOrder
          ? person2[sortField] - person1[sortField]
          : person1[sortField] - person2[sortField];
      default:
        return 0;
    }
  });
};
