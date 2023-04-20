import { SortType } from '../types/SortType';
import { Options } from '../types/Options';

export const filterPeople = ({
  people, sex, query, centuries, order, sort,
}: Options) => {
  let filteredPeople = [...people];

  if (sex) {
    filteredPeople = filteredPeople
      .filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople
      .filter(person => person
        .name.toLowerCase().includes(query.toLowerCase()));
  }

  if (centuries.length) {
    filteredPeople = filteredPeople
      .filter(person => centuries
        .includes(Math.ceil(person.born / 100).toString()));
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((personA, personB) => {
      switch (sort) {
        case SortType.NAME:
        case SortType.SEX:
          return personA[sort].localeCompare(personB[sort]);

        case SortType.BORN:
          return personA.born - personB.born;

        case SortType.DIED:
          return personA.died - personB.died;

        default:
          throw new Error('The sort type is not defined');
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
