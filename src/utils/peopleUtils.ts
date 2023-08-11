import { SortField } from '../types/sortField';
import { Person } from '../types/Person';

type ParentType = 'father' | 'mother';

type FilterSortParams = {
  sex: string;
  query: string;
  centuries: string[];
  sortField: SortField;
  sortOrder: string;
};

export const findParentByType = (
  people: Person[],
  person: Person,
  parentType: ParentType,
): Person | undefined => {
  if (parentType === 'father') {
    return people.find(({ name }) => name === person.fatherName);
  }

  return people.find(({ name }) => name === person.motherName);
};

export const filterAndSortPeople = (
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
