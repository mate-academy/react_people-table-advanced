import { Person } from '../types';

export const filterData = (
  peopleData: Person[],
  query: string,
  sex: string,
  sort: string,
  order: string,
  centuries: string[],
): Person[] => {
  const matchesQuery = (str: string | null, queryLower: string) => {
    return str && str.toLowerCase().includes(queryLower);
  };

  let filteredDataByParams = peopleData.filter((person) => {
    if (query) {
      const queryLower = query.toLowerCase();
      const nameMatches = matchesQuery(person.name, queryLower);
      const fatherMatches = matchesQuery(person.fatherName, queryLower);
      const motherMatches = matchesQuery(person.motherName, queryLower);

      if (!nameMatches && !fatherMatches && !motherMatches) {
        return false;
      }
    }

    if (sex && person.sex !== sex) {
      return false;
    }

    if (centuries.length) {
      const birthCentury = Math.floor(person.born / 100) + 1;

      if (!centuries.some((century) => century === birthCentury.toString())) {
        return false;
      }
    }

    return true;
  });

  filteredDataByParams = filteredDataByParams.sort((a, b) => {
    let compare = 0;

    if (sort === 'sex') {
      compare = a.sex.localeCompare(b.sex);
    } else if (sort === 'born') {
      compare = a.born - b.born;
    } else if (sort === 'died') {
      compare = a.died - b.died;
    } else if (sort === 'name') {
      compare = a.name.localeCompare(b.name);
    }

    return order === null ? compare : -compare;
  });

  return filteredDataByParams;
};
