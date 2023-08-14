/*eslint-disable*/
import { Person } from "../types";
import { ORDER } from "../types/OrderEnum";
import { SEX } from "../types/SexEnum";
import { SORT } from "../types/SortEnum";

type Params = {
  gender: SEX;
  query: string;
  centuries: string[];
  sort: SORT;
  order: string;
};

export const filterPeople = (
  peoples: Person[],
  { gender, query, centuries, sort, order }: Params
): Person[] => {
  let peopleCopy = [...peoples];

  if (gender) {
    peopleCopy = peopleCopy.filter((human) => human.sex === gender);
  }

  if (query) {
    const normalizeQuery = query.toLowerCase().trim();

    peopleCopy = peopleCopy.filter(
      (human) =>
        human.name.toLowerCase().includes(normalizeQuery) ||
        human.motherName?.toLowerCase().includes(normalizeQuery) ||
        human.fatherName?.toLowerCase().includes(normalizeQuery)
    );
  }

  if (centuries.length > 0) {
    peopleCopy = peopleCopy.filter((human) => {
      const personCentury = Math.ceil(human.born / 100);

      return centuries.includes(personCentury.toString());
    });
  }

  if (sort) {
    peopleCopy.sort((a, b) => {
      switch (sort) {
        case SORT.NAME:
          return a.name.localeCompare(b.name);
        case SORT.BORN:
          return a.born - b.born;
        case SORT.SEX:
          return a.sex.localeCompare(b.sex);
        case SORT.DIED:
          return a.died - b.died;
        default:
          return 0;
      }
    });
  }

  if (order === ORDER.DESC) {
    return peopleCopy.reverse();
  }

  return peopleCopy;
};
