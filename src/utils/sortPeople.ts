import { Person, SortTypes } from '../types';

export const sortPeople = (people: Person[], searchParams: URLSearchParams) => {
  const sortBy = searchParams.get('sort') || '';
  const orderBy = searchParams.get('order') || '';

  const sortedPeople = people.sort((personA: Person, personB: Person) => {
    switch (sortBy) {
      case SortTypes.NAME:
        return personA.name.localeCompare(personB.name);

      case SortTypes.SEX:
        return personA.sex.localeCompare(personB.sex);

      case SortTypes.BORN:
        return personA.born - personB.born;

      case SortTypes.DIED:
        return personA.died - personB.died;

      default:
        return 0;
    }
  });

  return orderBy ? sortedPeople.reverse() : sortedPeople;
};
