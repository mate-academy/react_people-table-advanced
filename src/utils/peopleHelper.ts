import { SortingOption } from '../constants/SortingOption';
import { Person } from '../types';

export function getCentury(year: number): number {
  return Math.ceil(year / 100);
}

export function preparePeople(
  tempPeople: Person[],
  sort: string,
  order: string,
  sex: string,
  query: string,
  centuries: string[],
): Person[] | null {
  let sortedPeople = tempPeople?.sort((p1, p2) => {
    switch (sort) {
      case SortingOption.Name:
        return p1.name.localeCompare(p2.name);
      case SortingOption.Sex:
        return p1.sex.localeCompare(p2.sex);
      case SortingOption.Born:
        return p1.born - p2.born;
      case SortingOption.Died:
        return p1.died - p2.died;
      default:
        return 0;
    }
  });

  if (order) {
    sortedPeople?.reverse();
  }

  if (sex) {
    sortedPeople = sortedPeople?.filter(human => human.sex === sex);
  }

  if (query) {
    sortedPeople = sortedPeople.filter(human => human.name
      .toLowerCase().includes(query.toLowerCase())
      || (human.fatherName && human.fatherName
        .toLowerCase().includes(query.toLowerCase()))
      || (human.motherName && human.motherName
        .toLowerCase().includes(query.toLowerCase())));
  }

  if (centuries.length) {
    sortedPeople = sortedPeople.filter(person => centuries
      .includes(getCentury(person.born).toString()));
  }

  return sortedPeople;
}
