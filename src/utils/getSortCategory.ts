import { Person } from '../types';
import { SortCategories } from './vars';

function includesQuery(person: Person, query: string) {
  return person.name.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query);
}

export function getSortCategory(
  people: Person[],
  sort: string,
  order: string,
  sex: string,
  query: string,
  centuries: string[],
) {
  let visiblePeople = [...people];

  switch (sort) {
    case SortCategories.Name:
    case SortCategories.Sex:
      visiblePeople.sort((a, b) => a[sort].localeCompare(b[sort]));
      break;

    case SortCategories.Born:
    case SortCategories.Died:
      visiblePeople.sort((a, b) => a[sort] - b[sort]);
      break;

    default:
      break;
  }

  if (order) {
    visiblePeople.reverse();
  }

  if (sex !== 'all') {
    visiblePeople = visiblePeople.filter(person => {
      return person.sex === sex;
    });
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const normalizedQuery = query.toLowerCase();

      return includesQuery(person, normalizedQuery);
    });
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      return centuries.some(century => +century === Math.floor(
        (person.born - 1) / 100,
      ) + 1);
    });
  }

  return visiblePeople;
}
