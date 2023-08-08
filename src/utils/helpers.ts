import { Person } from "../types";

type Filter = {
  query: string,
  sex: string,
  centuries: string[],
  sort: string,
  order: string,
};

export type PreparedPeople = (people: Person[], filter: Filter) => Person[];

export const preparePeople: PreparedPeople = (
  people,
  {
    query,
    sex,
    centuries,
    sort,
    order,
  },
) => {
  let newPeople = [...people];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    newPeople = newPeople.filter(person => {
      return person.name.toLowerCase().includes(normalizedQuery)
        || (person.motherName || '').toLowerCase().includes(normalizedQuery)
        || (person.fatherName || '').toLowerCase().includes(normalizedQuery);
    });
  }

  if (sex) {
    newPeople = newPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    newPeople = newPeople.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  if (sort) {
    newPeople = newPeople.sort((a, b) => {
      switch (sort) {
        case 'Name':
          return a.name.localeCompare(b.name);
        case 'Sex':
          return a.sex.localeCompare(b.sex);
        case 'Born':
          return a.born - b.born;
        case 'Died':
          return a.died - b.died;
        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    newPeople = newPeople.reverse();
  }

  return newPeople;
};
