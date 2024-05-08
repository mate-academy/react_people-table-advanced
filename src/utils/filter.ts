import { Person } from '../types';

function handleQueryChange(people: Person[], query: string): Person[] {
  const normalizedQuery = query.toLowerCase();

  return people.filter(person => {
    const nameHasQuery = person.name
      .toLocaleLowerCase()
      .includes(normalizedQuery);
    const motherNameHasQuery =
      person.motherName &&
      person.motherName.toLocaleLowerCase().includes(normalizedQuery);
    const fatherNameHasQuery =
      person.fatherName &&
      person.fatherName.toLocaleLowerCase().includes(normalizedQuery);

    return nameHasQuery || motherNameHasQuery || fatherNameHasQuery;
  });
}

function handleSelectedCenturies(
  people: Person[],
  centuries: string[],
): Person[] {
  return people.filter(person => {
    const personCentury = Math.ceil(person.died / 100);
    let livedInTheCentury = false;

    for (const century of centuries) {
      if (personCentury === +century) {
        livedInTheCentury = true;
        break;
      }
    }

    return livedInTheCentury;
  });
}

export function getFilteredPeople(
  people: Person[],
  filterParams: URLSearchParams,
): Person[] {
  let newPeople = [...people];
  const query = filterParams.get('query');
  const gender = filterParams.get('sex');
  const centuries = filterParams.getAll('centuries');
  const order = filterParams.get('order');
  const sort = filterParams.get('sort') as keyof Person;

  if (query) {
    newPeople = handleQueryChange(newPeople, query);
  }

  if (gender) {
    newPeople = newPeople.filter(person => person.sex === gender);
  }

  if (centuries.length > 0) {
    newPeople = handleSelectedCenturies(newPeople, centuries);
  }

  if (sort) {
    newPeople.sort((person1, person2) => {
      const value1 = person1[sort];
      const value2 = person2[sort];

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.localeCompare(value2);
      }

      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value1 - value2;
      }

      return 0;
    });
  }

  if (order) {
    newPeople.reverse();
  }

  return newPeople || [];
}
