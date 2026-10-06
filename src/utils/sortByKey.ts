import { Person } from '../types';

export function sortByKey(
  filteredPeople: Person[],
  search: URLSearchParams,
): Person[] {
  const key = search.get('sort');

  if (key) {
    const people = [...filteredPeople];

    people.sort((person1, person2) => {
      return typeof person1[key] === 'string'
        ? person1[key].localeCompare(person2[key])
        : person1[key] - person2[key];
    });

    if (search.get('order') === 'desc') {
      people.reverse();
    }

    return people;
  }

  return filteredPeople;
}
