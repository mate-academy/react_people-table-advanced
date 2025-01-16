import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  let visiblePeople = people;

  const filterSex = searchParams.get('sex');
  const filterQuery = searchParams.get('query')?.toLowerCase() || '';
  const filterCentury = searchParams.getAll('century') || [];

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  if (filterSex) {
    visiblePeople = visiblePeople.filter(person => person.sex === filterSex);
  }

  if (filterQuery) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(filterQuery) ||
        person.fatherName?.toLowerCase().includes(filterQuery) ||
        person.motherName?.toLowerCase().includes(filterQuery),
    );
  }

  if (filterCentury && filterCentury.length > 0) {
    visiblePeople = visiblePeople.filter(person =>
      filterCentury.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (currentSort) {
    const sortOrder = currentOrder ? -1 : 1;

    switch (currentSort) {
      case 'name':
      case 'sex':
        visiblePeople = visiblePeople.sort(
          (a: Person, b: Person) =>
            sortOrder * a[currentSort].localeCompare(b[currentSort]),
        );
        break;

      case 'born':
      case 'died':
        visiblePeople = visiblePeople.sort(
          (a: Person, b: Person) =>
            sortOrder * (a[currentSort] - b[currentSort]),
        );
        break;

      default:
        break;
    }
  }

  return visiblePeople;
};
