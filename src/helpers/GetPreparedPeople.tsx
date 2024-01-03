import { Person } from '../types';
import { SortBy } from '../types/SortBy';

export interface FilterParams {
  sort: string,
  query: string,
  sex: string,
  centuries: string[],
  order: string,
}

export function getPreparedPeople(
  people: Person[], filterParams: FilterParams,
) {
  let copyPeople = [...people];

  if (filterParams.sex) {
    copyPeople = copyPeople.filter(person => person.sex === filterParams.sex);
  }

  if (filterParams.query) {
    const smallLetters = filterParams.query.toLowerCase();

    copyPeople = copyPeople.filter(person => (
      person.name.toLowerCase().includes(smallLetters)
      || person.motherName?.toLowerCase().includes(smallLetters)
      || person.fatherName?.toLowerCase().includes(smallLetters)
    ));
  }

  if (filterParams.centuries.length) {
    copyPeople = copyPeople.filter(person => (
      filterParams.centuries.includes(Math.ceil(person.born / 100).toString())
    ));
  }

  if (filterParams.sort) {
    const reverse = filterParams.order ? -1 : 1;

    copyPeople = copyPeople.sort((a, b) => {
      switch (filterParams.sort) {
        case SortBy.Name:
        case SortBy.Sex:
          return a[filterParams.sort]
            .localeCompare(b[filterParams.sort]) * reverse;

        case SortBy.Born:
        case SortBy.Died:
          return (a[filterParams.sort] - b[filterParams.sort]) * reverse;

        default:
          return 1;
      }
    });
  }

  return copyPeople;
}
