import { Person } from '../types';

export enum FilterTypes {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const filter = (
  selectedFilter: URLSearchParams,
  peopleList: Person[],
): Person[] => {
  let preparedPeople = peopleList;
  const sexTypes = selectedFilter.get('sex');
  const queryFilter = selectedFilter.get('query');
  const centuryFilter = selectedFilter.getAll('centuries');
  const sort = selectedFilter.get('sort');
  const order = selectedFilter.get('order');

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

    preparedPeople = preparedPeople.filter(
      person =>
        person.name.toLowerCase().includes(lowerCaseQuery) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(lowerCaseQuery)) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(lowerCaseQuery)),
    );
  }

  if (sort) {
    preparedPeople.sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return (a[sort as keyof Person] as string).localeCompare(
            b[sort as keyof Person] as string,
          );
        case 'born':
        case 'died':
          return (
            (a[sort as keyof Person] as number) -
            (b[sort as keyof Person] as number)
          );
        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
