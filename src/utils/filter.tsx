import { Person } from '../types';
import { AvailableFilters, FilterTypes, OrderType, SortOptions } from './enums';

export const filter = (
  selectedFilter: URLSearchParams,
  peopleList: Person[],
): Person[] => {
  let preparedPeople = peopleList;
  const sexTypes = selectedFilter.get(AvailableFilters.Sex);
  const queryFilter = selectedFilter.get(AvailableFilters.Query);
  const centuryFilter = selectedFilter.getAll(AvailableFilters.Centuries);
  const sort = selectedFilter.get(AvailableFilters.Sort);
  const order = selectedFilter.get(AvailableFilters.Order);

  if (sexTypes && sexTypes !== FilterTypes.All) {
    preparedPeople = preparedPeople.filter(person => person.sex === sexTypes);
  }

  if (centuryFilter.length) {
    preparedPeople = preparedPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuryFilter.includes(century);
    });
  }

  if (queryFilter) {
    const lowerCaseQuery = queryFilter.toLowerCase();

    preparedPeople = preparedPeople.filter(person => {
      return [
        person.name,
        person.fatherName ?? '',
        person.motherName ?? '',
      ].some(field => field.toLowerCase().includes(lowerCaseQuery));
    });
  }

  if (sort) {
    preparedPeople.sort((a, b) => {
      switch (sort) {
        case SortOptions.Name:
        case SortOptions.Sex:
          return (a[sort as keyof Person] as string).localeCompare(
            b[sort as keyof Person] as string,
          );
        case SortOptions.Born:
        case SortOptions.Died:
          return (
            (a[sort as keyof Person] as number) -
            (b[sort as keyof Person] as number)
          );
        default:
          return 0;
      }
    });
  }

  if (order === OrderType.desc) {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
