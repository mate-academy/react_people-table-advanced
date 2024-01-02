import { Person, SortField } from '../types';

type FilterSortParams = {
  sex: string;
  query: string;
  centuries: string[];
  sortField: SortField;
  sortOrder: string;
};

export const filterPeople = (
  people: Person[],
  params: FilterSortParams,
): Person[] => {
  let filteredPeople = people;

  if (params.sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === params.sex);
  }

  if (params.query) {
    const normalizeQuery = params.query.toLowerCase();

    filteredPeople = filteredPeople
      .filter(({ name, motherName, fatherName }) => {
        const byName = name.toLowerCase().includes(normalizeQuery);
        const byMotherName = motherName?.toLowerCase().includes(normalizeQuery);
        const byFatherName = fatherName?.toLowerCase().includes(normalizeQuery);

        return byName || byMotherName || byFatherName;
      });
  }

  if (params.centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return params.centuries.includes(century);
    });
  }

  if (params.sortField) {
    const order = params.sortOrder ? -1 : 1;

    filteredPeople = [...filteredPeople].sort((p1, p2) => {
      switch (params.sortField) {
        case SortField.BORN:
        case SortField.DIED:
          return (p1[params.sortField] - p2[params.sortField]) * order;
        case SortField.NAME:
        case SortField.SEX:
          return p1[params.sortField]
            .localeCompare(p2[params.sortField]) * order;
        default:
          return 0;
      }
    });
  }

  return filteredPeople;
};
