import { Person } from '../types';
import { FilterParams } from '../types/FilterParams';

export const filterPeople = (
  searchParams: URLSearchParams,
  allPeople: Person[],
) => {
  const sexSearchValue = searchParams.get(FilterParams.Sex);
  const querySearchValue = searchParams.get(FilterParams.Query);
  const centurySearchValue = searchParams.getAll(FilterParams.Century);

  let filteredPeople = [...allPeople];

  if (sexSearchValue) {
    filteredPeople = filteredPeople.filter(p => p.sex === sexSearchValue);
  }

  if (querySearchValue) {
    filteredPeople = filteredPeople.filter(p => {
      const lowerCaseQuery = querySearchValue.toLocaleLowerCase();

      return (
        p.name.toLocaleLowerCase().includes(lowerCaseQuery)
        || p.motherName?.toLocaleLowerCase().includes(lowerCaseQuery)
        || p.fatherName?.toLocaleLowerCase().includes(lowerCaseQuery)
      );
    });
  }

  if (centurySearchValue.length) {
    let peopleFromCenturies: Person[] = [];

    centurySearchValue.forEach(century => {
      const peopleFromCurrCentury = [...filteredPeople].filter(p => (
        Math.ceil(p.born / 100) === +century
      ));

      peopleFromCenturies = [
        ...peopleFromCenturies,
        ...peopleFromCurrCentury,
      ];
    });

    filteredPeople = peopleFromCenturies;
  }

  return filteredPeople;
};
