import { Person } from '../types/Person';
import { SortBy } from '../types/SortBy';

export const getFilteredPeople = (
  items: Person[],
  query: string | null,
  sex: string | null,
  centuries: string[] | null,
  sortType: string,
  order: string | null,
) => {
  let updatedItems = [...items];

  if (sortType) {
    updatedItems = updatedItems.sort((a, b) => {
      switch (sortType) {
        case SortBy.Name:
        case SortBy.Sex:
          return !order
            ? a[sortType].localeCompare(b[sortType])
            : -a[sortType].localeCompare(b[sortType]);

        case SortBy.Born:
        case SortBy.Died:
          return !order
            ? a[sortType] - b[sortType]
            : b[sortType] - a[sortType];

        default:
          return 0;
      }
    });
  }

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    updatedItems = updatedItems.filter(item => {
      return item.name.toLowerCase().includes(normalizedQuery)
        || (item.fatherName
          && item.fatherName.toLowerCase().includes(normalizedQuery))
        || (item.motherName
          && item.motherName.toLowerCase().includes(normalizedQuery));
    });
  }

  if (sex) {
    updatedItems = updatedItems.filter(item => item.sex === sex);
  }

  if (centuries?.length) {
    updatedItems = updatedItems.filter(item => centuries
      .includes((Math.ceil(item.born / 100)).toString()));
  }

  return updatedItems;
};
