import { Person } from '../types';

export const filterPeople = (params: URLSearchParams, people: Person[]) => {
  const queryString = params.get('query')?.toUpperCase();
  const sortBy = params.get('sort');
  const sortOrder = params.toString().includes('desc') ? -1 : 1;

  let filteredPeople = people.slice();

  // const centuriesParam = params.get('centuries');
  // const centuries: number[] = centuriesParam
  //   ? centuriesParam.split(',').map(century => parseInt(century))
  //   : [];

  // if (centuries.length) {
  //   return filteredPeople.filter(person =>
  //     centuries.some(century => {
  //       const centuryStart = century * 100;
  //       const centuryEnd = centuryStart + 99;

  //       return person.born >= centuryStart && person.born <= centuryEnd;
  //     }),
  //   );
  // }

  if (queryString) {
    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toUpperCase().includes(queryString) ||
        (person.fatherName &&
          person.fatherName.toUpperCase().includes(queryString)) ||
        (person.motherName &&
          person.motherName.toUpperCase().includes(queryString)),
    );
  }

  if (params.get('sex') === 'm') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'm');
  }

  if (params.get('sex') === 'f') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'f');
  }

  if (sortBy) {
    switch (sortBy) {
      case 'name':
        filteredPeople.sort((a, b) =>
          a.name > b.name ? sortOrder : -sortOrder,
        );
        break;
      case 'sex':
        filteredPeople.sort((a, b) => (a.sex > b.sex ? sortOrder : -sortOrder));
        break;
      case 'born':
        filteredPeople.sort((a, b) => sortOrder * (a.born - b.born));
        break;
      case 'died':
        filteredPeople.sort((a, b) => sortOrder * (a.died - b.died));
        break;
      default:
        break;
    }
  }

  return filteredPeople;
};
