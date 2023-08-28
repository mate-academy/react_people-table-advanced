import { Person, SortField } from '../types';

type Params = {
  query: string | null,
  sex: string | null,
  centuries: string[],
  sort: string | null,
  order: string | null,
};

type GetVisiblePeope = (
  preparedPeople: Person[],
  params: Params) => Person[];

export const getVisiblePeople: GetVisiblePeope = (preparedPeople, params) => {
  const {
    query,
    sex,
    centuries,
    sort,
    order,
  } = params;
  let visiblePeople = [...preparedPeople];

  visiblePeople = visiblePeople.filter(person => {
    if (query?.trim()) {
      const normalizedQuery = query.trim().toLowerCase();
      const isPerson = person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery);

      if (!isPerson) {
        return false;
      }
    }

    if (sex && person.sex !== sex) {
      return false;
    }

    if (centuries.length) {
      const personCentury = `${Math.ceil(person.born / 100)}`;

      if (!centuries.includes(personCentury)) {
        return false;
      }
    }

    return true;
  });

  if (sort) {
    visiblePeople.sort((person1, person2) => {
      switch (sort) {
        case SortField.Name:
        case SortField.Sex:
          return person1[sort].localeCompare(person2[sort]);

        case SortField.Born:
        case SortField.Died:
          return person1[sort] - person2[sort];

        default:
          return 1;
      }
    });
  }

  if (order) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};
