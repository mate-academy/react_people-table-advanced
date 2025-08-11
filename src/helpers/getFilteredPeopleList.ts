import { FieldToSortSearchQuery, Person, SearchParams } from '../types';

export const getFilteredPeopleList = (
  fullPeopleInfo: Person[],
  searchParams: URLSearchParams,
) => {
  const sexSearchParam = searchParams.get(SearchParams.sex) || '';
  const centurySearchParams = searchParams.getAll(SearchParams.centuries);
  const querySearchParams =
    searchParams.get(SearchParams.query)?.toLowerCase() || '';
  const sortSearchParams = searchParams.get(
    SearchParams.sort,
  ) as FieldToSortSearchQuery;
  const orderSearchParams = searchParams.get(SearchParams.order);

  let newPeopleList = fullPeopleInfo;

  if (sexSearchParam) {
    newPeopleList = newPeopleList.filter(({ sex }) => sex === sexSearchParam);
  }

  if (querySearchParams) {
    newPeopleList = newPeopleList.filter(({ name, fatherName, motherName }) => {
      return (
        name.toLowerCase().includes(querySearchParams) ||
        fatherName?.toLowerCase().includes(querySearchParams) ||
        motherName?.toLowerCase().includes(querySearchParams)
      );
    });
  }

  if (!!centurySearchParams.length) {
    newPeopleList = newPeopleList.filter(({ born }) => {
      const currentCentury = String(Math.ceil(born / 100));

      return centurySearchParams.includes(currentCentury);
    });
  }

  if (sortSearchParams) {
    newPeopleList.sort((a, b) => {
      let result = 0;

      const aValue = a[sortSearchParams];
      const bValue = b[sortSearchParams];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        result = aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue;
      }

      return orderSearchParams ? result * -1 : result;
    });
  }

  return newPeopleList;
};
