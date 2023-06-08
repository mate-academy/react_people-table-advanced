import { Person } from '../types';

export const filterPeoples = (
  peoples: Person[],
  sex: string | null,
  centuries: string[],
  query: string | null,
) => {
  let prePeoples = [...peoples];

  if (query) {
    prePeoples = prePeoples.filter((person) => {
      const names = person.name + person.motherName + person.fatherName;

      return names.toUpperCase().includes(query.toUpperCase().trim());
    });
  }

  if (sex) {
    prePeoples = prePeoples.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    prePeoples = prePeoples.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  return prePeoples;
};
