import { Person } from '../types';

enum SortField {
  Sex = 'sex',
  Name = 'name',
  Born = 'born',
  Died = 'died',
}

export const toFlilterPeople = (
  people: Person[],
  order: string | null,
  sort: string | null,
  query: string | null,
  sex: string | null,
  centuries: string[],
) => {
  let allPeople = [...people];

  if (sort) {
    allPeople.sort((a, b) => {
      let comparisonResult = 0;

      switch (sort) {
        case SortField.Sex:
        case SortField.Name:
          comparisonResult = a[sort].localeCompare(b[sort]);
          break;

        case SortField.Born:
        case SortField.Died:
          comparisonResult = a[sort] - b[sort];
          break;

        default:
          comparisonResult = 0;
      }

      return order === 'desc' ? -comparisonResult : comparisonResult;
    });
  }

  if (query) {
    allPeople = allPeople.filter(person => {
      if (
        person.name.toLowerCase().includes(query.toLowerCase())
        || person.fatherName?.toLowerCase().includes(query.toLowerCase())
        || person.motherName?.toLowerCase().includes(query.toLowerCase())
      ) {
        return true;
      }

      return false;
    });
  }

  if (sex) {
    allPeople = allPeople.filter(p => p.sex === sex);
  }

  if (centuries.length) {
    allPeople = allPeople.filter(
      person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ),
    );
  }

  return allPeople;
};
