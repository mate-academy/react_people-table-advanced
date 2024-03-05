import { Person } from '../types';
import { SortFields } from '../types/SortFields';

export const filterPeople = (people: Person[], filterSettings: object) => {
  let filteredPeople = [...people];

  Object.entries(filterSettings).forEach(([key, val]) => {
    if (val) {
      switch (key) {
        case 'query':
          filteredPeople = filteredPeople.filter(
            person =>
              person.name.toLowerCase().includes(val.toLowerCase()) ||
              person.fatherName?.toLowerCase().includes(val.toLowerCase()) ||
              person.motherName?.toLowerCase().includes(val.toLowerCase()),
          );
          break;

        case 'sex':
          if (val === 'all') {
            break;
          }

          filteredPeople = filteredPeople.filter(person => person.sex === val);
          break;

        case 'centuries':
          if (!val.length) {
            break;
          }

          filteredPeople = filteredPeople.filter(person =>
            val.includes(`${Math.ceil(person.born / 100)}`),
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
