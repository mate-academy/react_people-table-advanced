import { Person } from '../types';

export const filteredPeople = (
  people: Person[],
  query: string,
  centuries: string[],
  gender: string,
  sort: string,
  order: string,
) => {
  let peopleFromServer = [...people];

  if (query.includes(' ')) {
    return [];
  }

  if (query) {
    const trimmedQuery = query.trim().toLowerCase();

    peopleFromServer = people.filter(
      person =>
        person.name.toLowerCase().includes(trimmedQuery) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(trimmedQuery)) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(trimmedQuery)),
    );
  }

  if (centuries.length > 0) {
    peopleFromServer = peopleFromServer.filter(person =>
      centuries.includes(Math.ceil(+person.born / 100).toString()),
    );
  }

  if (gender) {
    peopleFromServer = peopleFromServer.filter(person => person.sex === gender);
  }

  if (sort) {
    peopleFromServer = peopleFromServer.sort((first, secound) => {
      switch (sort) {
        case 'name':
          return first.name.localeCompare(secound.name);
        case 'sex':
          return first.sex.localeCompare(secound.sex);
        case 'born':
          return first.born - secound.born;
        case 'died':
          return first.died - secound.died;
        default:
          return 0;
      }
    });
  }

  if (order) {
    peopleFromServer = peopleFromServer.reverse();
  }

  return peopleFromServer;
};
