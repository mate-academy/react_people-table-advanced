import { Person } from '../types';
import { SexFilter } from '../types/SexFilter';

type SearchData = {
  sex: SexFilter | string,
  centuries: string[],
  query: string,
};

export function getFilteredPeople(
  peopleData: Person[],
  data: SearchData,
) {
  const { sex, centuries, query } = data;

  const filterBySex = (arr: Person[]) => {
    switch (sex) {
      case SexFilter.Female:
        return arr.filter(p => p.sex === SexFilter.Female);

      case SexFilter.Male:
        return arr.filter(p => p.sex === SexFilter.Male);

      default:
        return arr;
    }
  };

  const filterByCenturies = (arr: Person[]) => {
    return arr.filter(p => {
      const centuryBorn = (Math.ceil(p.born / 100)).toString();

      return centuries.includes(centuryBorn);
    });
  };

  const filterByQuery = (arr: Person[]) => {
    return arr.filter(p => p.name.toLowerCase()
      .includes(query.toLowerCase()));
  };

  const sortedBySex = filterBySex(peopleData);
  const sortedByCenturies = centuries.length
    ? filterByCenturies(sortedBySex)
    : sortedBySex;

  return filterByQuery(sortedByCenturies);
}
