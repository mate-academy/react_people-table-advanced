import {
  Person, FiltersParams, SortType, SortDirection,
} from '../types';

export function getVisiblePeople(
  people: Person[],
  {
    query, centuries, sex, sort, order,
  }: FiltersParams,
) {
  let visiblePeople = [...people];

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter((person) => {
      const century = Math.ceil(person.died / 100);

      return centuries.includes(century.toString());
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter((person) => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visiblePeople = visiblePeople.filter((person) => {
      return person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery);
    });
  }

  if (sort && order) {
    visiblePeople.sort(
      (personA: Person, personB: Person) => {
        switch (sort) {
          case SortType.NAME:
          case SortType.SEX:
            return order === SortDirection.ASC
              ? personA[sort].localeCompare(personB[sort])
              : personB[sort].localeCompare(personA[sort]);

          case SortType.BORN:
          case SortType.DIED:
            return order === SortDirection.ASC
              ? personA[sort] - personB[sort]
              : personB[sort] - personA[sort];

          default:
            return 0;
        }
      },
    );
  }

  return visiblePeople;
}
