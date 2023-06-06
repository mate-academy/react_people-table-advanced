import { Person } from '../types';

export const filteredPeoples = (
  peoples: Person[],
  sex: string | null,
  centuries: string[],
  query: string | null,
) => {
  let prePeoples = [...peoples];

  if (query) {
    prePeoples = peoples.filter((person) => {
      const names = person.name + person.motherName + person.fatherName;

      return names.toUpperCase().includes(query.toUpperCase().trim());
    });
  }

  if (sex) {
    prePeoples = peoples.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    prePeoples = peoples.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  return prePeoples;
};
