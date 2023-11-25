import { Person } from '../types/Person';

export const getVisiblePeople = (
  people: Person[] | null,
  sex: string | null,
  query: string | undefined,
  centuries: string[],
  sort: string | null,
  order: string | null,
) => {
  if (!people) {
    return [];
  }

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter((person) => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(
      (person) => person.name.toLocaleLowerCase().includes(query)
        || person.motherName?.toLocaleLowerCase().includes(query)
        || person.fatherName?.toLocaleLowerCase().includes(query),
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople
      .filter((person) => centuries
        ?.includes(Math.ceil(person.born / 100).toString()));
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);

        case 'sex':
          return a.sex.localeCompare(b.sex);

        case 'born':
          return a.born - b.born;

        case 'died':
          return a.died - b.died;

        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
