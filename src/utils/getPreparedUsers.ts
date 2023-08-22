import { Person } from '../types';

export const getPreparedUsers = ({
  sexPar,
  queryPar,
  centuriesPar,
  sortPar,
  orderPar,
  peoples,
}: {
  sexPar: string,
  queryPar: string,
  centuriesPar: string[],
  sortPar: string,
  orderPar: string,
  peoples: Person[],
}): Person[] => {
  let newPeoples = [...peoples];

  if (sexPar.length > 0) {
    newPeoples = newPeoples.filter((person) => person.sex === sexPar);
  }

  if (queryPar.length > 0) {
    newPeoples = newPeoples.filter((person) => {
      const normQuery = queryPar.toLowerCase();

      return person.name.toLowerCase().includes(normQuery)
        || person.motherName?.toLowerCase().includes(normQuery)
        || person.fatherName?.toLowerCase().includes(normQuery);
    });
  }

  if (centuriesPar.length > 0) {
    const centuryFilteredPeoples: Person[] = [];

    centuriesPar.forEach((cent) => {
      centuryFilteredPeoples.push(...newPeoples.filter((person) => (
        person.born < (+cent * 100)
          && person.born >= (+cent * 100 - 100)
      )));
    });

    newPeoples = peoples.filter(person => (
      centuryFilteredPeoples.some(human => human.name === person.name)
    ));
  }

  if (sortPar.length > 0) {
    switch (sortPar) {
      case 'name':
      case 'sex':
        newPeoples.sort((a, b) => (orderPar
          ? b[sortPar].localeCompare(a[sortPar])
          : a[sortPar].localeCompare(b[sortPar])
        ));

        break;
      case 'born':
      case 'died':
        newPeoples.sort((a, b) => (orderPar
          ? b[sortPar] - a[sortPar]
          : a[sortPar] - b[sortPar]
        ));

        break;
      default: return newPeoples;
    }
  }

  return newPeoples;
};
