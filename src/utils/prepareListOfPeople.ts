import { Person } from '../types';

export const preparePeople = (
  curQuery: string,
  curSex: string,
  curCenturies: string[],
  curSort: string,
  curOrder: string,
  curPeople: Person[],
) => {
  let newPeople = [...curPeople];

  if (curQuery) {
    const normalizedQuery = curQuery.toLocaleLowerCase();

    newPeople = newPeople.filter(person => {
      return (
        person.name.toLocaleLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLocaleLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLocaleLowerCase().includes(normalizedQuery)
      );
    });
  }

  if (curSex) {
    newPeople = newPeople.filter(person => {
      return person.sex === curSex;
    });
  }

  if (curCenturies.length > 0) {
    newPeople = newPeople.filter(person => {
      return curCenturies.includes(String(Math.floor(person.born / 100) + 1));
    });
  }

  if (curSort) {
    newPeople.sort((a: Person, b: Person) => {
      switch (curSort) {
        case 'name':
        case 'sex':
          return a[curSort].localeCompare(b[curSort]);
        case 'born':
        case 'died':
          return +a[curSort] - +b[curSort];
        default:
          return 0;
      }
    });
  }

  if (curOrder) {
    newPeople.reverse();
  }

  return newPeople;
};
