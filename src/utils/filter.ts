import { Person, SortField } from '../types';

export type FilterSortParams = {
  sortField: SortField;
  order: string;
  sex: string;
  query: string;
  centuries: string[];
};

export const filterPeople = (
  people: Person[],
  params: FilterSortParams,
): Person[] => {
  let filteredPeople = [...people];

  if (params.sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === params.sex);
  }

  if (params.query) {
    const normalizeQuery = params.query.toLowerCase();

    filteredPeople = filteredPeople.filter(
      person => person.name.toLowerCase().includes(normalizeQuery)
      || person.fatherName?.toLowerCase().includes(normalizeQuery)
      || person.motherName?.toLowerCase().includes(normalizeQuery),
    );
  }

  if (params.centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return params.centuries.includes(century);
    });
  }

  if (params.sortField) {
    const order = params.order ? -1 : 1;

    filteredPeople = filteredPeople.sort((p1, p2) => {
      switch (params.sortField) {
        case SortField.Born:
        case SortField.Died:
          return (p1[params.sortField] - p2[params.sortField]) * order;
        case SortField.Name:
        case SortField.Sex:
          return p1[params.sortField]
            .localeCompare(p2[params.sortField]) * order;
        default:
          return 0;
      }
    });
  }

  return filteredPeople;
};
