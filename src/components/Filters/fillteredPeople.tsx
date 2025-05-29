import { Person } from '../../types';

type Fillter = {
  query: string;
  filterBySex: string | null;
  filterByCenturies: string[];
  sort: string | null;
  order: string | null;
};

export const filteredPeople = (people: Person[], filters: Fillter) => {
  const { query, filterBySex, filterByCenturies, sort, order } = filters;
  let newPeople = [...people];

  if (query) {
    const newQuery = query.trim().toLowerCase();

    newPeople = newPeople.filter(person => {
      return (
        person.name.toLowerCase().includes(newQuery) ||
        person.motherName?.toLowerCase().includes(newQuery) ||
        person.fatherName?.toLowerCase().includes(newQuery)
      );
    });
  }

  if (filterBySex) {
    newPeople = newPeople.filter(person => person.sex === filterBySex);
  }

  if (filterByCenturies && filterByCenturies.length > 0) {
    newPeople = newPeople.filter(person => {
      const birthCentury = Math.floor(person.born / 100) + 1;

      return filterByCenturies.includes(String(birthCentury));
    });
  }

  if (sort) {
    newPeople = newPeople.sort((person1, person2) => {
      switch (sort) {
        case 'name':
          return person1.name.localeCompare(person2.name);
        case 'sex':
          return person1.sex.localeCompare(person2.sex);
        case 'born':
          return person1.born - person2.born;
        case 'died':
          return person1.died - person2.died;
        default:
          return 0;
      }
    });
    if (order === 'desc') {
      newPeople = newPeople.reverse();
    }
  }

  return newPeople;
};
