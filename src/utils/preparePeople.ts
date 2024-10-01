import { Person, SearchOptions } from '../types';

export const preparePeople = (people: Person[], options: SearchOptions) => {
  const { sex, query, sort, order, centuries } = options;

  return people
    .filter(person => {
      if (!sex) {
        return person;
      }

      return person.sex === sex;
    })
    .filter(person => {
      return query ? person.name.includes(query) : person;
    })
    .filter(person => {
      if (!!centuries.length) {
        return centuries.includes(`${Math.floor(person.born / 100) + 1}`);
      }

      return person;
    })
    .sort((sort1, sort2) => {
      if (sort === 'name' || sort === 'sex') {
        return !order
          ? sort1[sort].localeCompare(sort2[sort])
          : sort2[sort].localeCompare(sort1[sort]);
      }

      if (sort === 'born' || sort === 'died') {
        return !order
          ? +sort1[sort] - +sort2[sort]
          : +sort2[sort] - +sort1[sort];
      }

      return 0;
    });
};
